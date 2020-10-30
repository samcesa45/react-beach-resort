import React, { useContext } from "react";
import RoomList from "./RoomList";
import RoomFilter from "./RoomFilter";
import { RoomContext } from "../Context/Context";
import Loading from "./Loading";
const RoomsContainer = () => {
  const context = useContext(RoomContext);

  const { loading, sortedRooms, rooms } = context;

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </>
  );
};

export default RoomsContainer;
