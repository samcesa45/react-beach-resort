import React, { useContext } from "react";
import { RoomContext } from "../Context/Context";
import Title from "../component/Title";

const getUniqueValues = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

const RoomFilter = (props) => {
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
  } = context;

  let types = getUniqueValues(props.rooms, "type");
  types = ["all", ...types];
  types = types.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  let guest = getUniqueValues(props.rooms, "capacity");
  guest = guest.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });
  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {types}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Guest</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="form-control"
            onChange={handleChange}
          >
            {guest}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Room price ${price}</label>
          <input
            type="range"
            className="form-control"
            min={minPrice}
            max={maxPrice}
            name="price"
            id="price"
            value={price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="size">Room Size Sqft</label>
          <input
            type="number"
            className="form-control"
            name="minSize"
            value={minSize}
            onChange={handleChange}
          />
          <input
            type="number"
            className="form-control"
            name="maxSize"
            value={maxSize}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              checked={breakfast}
              name="breakfast"
              id="breakfast"
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              checked={pets}
              name="pets"
              id="pets"
              onChange={handleChange}
            />
            <label htmlFor="pets">Pets</label>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RoomFilter;
