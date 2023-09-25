import React from "react";
import "../assets/tailwind.css";

const TapItem = ({ data }) => {
  return (
    <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div className="text-gray-900 font-bold text-lg mb-2">{data.name} | {data.subtype} {data.type}</div>
      <div className="text-gray-900 font-bold italic text-md mb-2">
        {data.brewer.name}
      </div>
      <div className="text-gray-600 font-bold text-md mb-2">
        {data.abv}% ABV {data.ibu} IBU
      </div>
      <p className="text-gray-700 text-base mb-2">
        {data.description}
      </p>
      {/* <p className="text-gray-600 text-base text-end font-thin"> last updated: {brew.updated} </p> */}
    </div>
  );
};
export default TapItem;