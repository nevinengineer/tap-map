import React from "react";
import "../assets/tailwind.css";
import MapComponent from "./MapComponent";

const BrewerItem = ({ data }) => {

  return (
    <div className="border-2 border-gray-400 hover:border-teal-700 rounded-lg m-1">
      <div className="p-2 m-2 flex flex-col justify-between leading-normal">
        <div className="text-gray-900 font-bold text-l mb-2">{data.name}</div>
        <div className="text-gray-700 font-semibold text-md mb-2">
          {data.address}
        </div>
        {/* <MapComponent position={position} className="flex-auto"></MapComponent> */}
      </div>
    </div>
  );
};

export default BrewerItem;