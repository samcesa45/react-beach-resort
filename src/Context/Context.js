import React, { useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";
import items from "../data";

const initialState = {
  rooms: [],
  sortedRooms: [],
  featuredRooms: [],
  loading: true,
  type: "all",
  capacity: 1,
  price: 0,
  minPrice: 0,
  maxPrice: 0,
  minSize: 0,
  maxSize: 0,
  breakfast: false,
  pets: false,
};

const formatData = (items) => {
  let tempItems = items.map((item) => {
    let id = item.sys.id;
    let images = item.fields.images.map((image) => image.fields.file.url);

    let room = { ...item.fields, images, id };
    return room;
  });
  return tempItems;
};

const RoomContext = React.createContext(initialState);
const RoomProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "INITIAL_RENDER",
      payload: formatData(items),
    });
  }, []);

  const filterRooms = (name, value) => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = state;

    let tempRooms = [...rooms];

    //transform values
    capacity = parseInt(capacity);
    price = parseInt(price);

    //Checking change
    switch (name) {
      case "type":
        type = value;
        break;
      case "capacity":
        value = parseInt(value);
        capacity = value;
        break;
      case "price":
        value = parseInt(value);
        price = value;
        break;
      case "minSize":
        minSize = value;
        break;
      case "maxSize":
        maxSize = value;
        break;
      case "breakfast":
        breakfast = value;
        break;
      case "pets":
        pets = value;
        break;
      default:
        break;
    }

    //filter by all
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }
    //filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    //filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);

    //filter by size

    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    //extras
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }

    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }

    return tempRooms;
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const filtered = filterRooms(name, value);

    //dispatch changes
    dispatch({
      type: "UPDATE_STATE",
      payload: {
        name,
        value,
        filtered,
      },
    });
  };

  const getRoom = (slug) => {
    let tempRooms = [...state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  return (
    <RoomContext.Provider
      value={{
        ...state,
        getRoom: getRoom,
        handleChange: handleChange,
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};

// const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomContext };
