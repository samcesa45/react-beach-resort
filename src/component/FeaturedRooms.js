import React, { useContext } from "react";
import { RoomContext } from "../Context/Context";
import Loading from "./Loading";
import Room from "../component/Room";
import Title from "./Title";

const FeaturedRooms = (props) => {
  const context = useContext(RoomContext);

  let { loading, featuredRooms: rooms } = context;
  rooms = rooms.map((room) => {
    return <Room key={room.id} room={room} />;
  });
  return (
    <section className="featured-rooms">
      <Title title="featured rooms" />
      <div className="featured-rooms-center">
        {loading ? <Loading /> : rooms}
      </div>
    </section>
  );
};

export default FeaturedRooms;
