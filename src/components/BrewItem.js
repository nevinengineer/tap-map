import React from "react";
import MapComponent from "./Map";
import "../assets/tailwind.css";

const flipLongLat = ({ coordinates }) => {
  const long = coordinates[0];
  const lat = coordinates[1];
  const position = [];
  position.push(lat);
  position.push(long);

  return position;
};

const BrewItem = ({ brew }) => {
  // const coordinates =
  //   brew.on_taps[0].establishmentByEstablishment.establishment_location
  //     .location.coordinates;
  //     const position = flipLongLat({coordinates})

  return (
 
    <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div className="m-2">
        <div className="text-gray-900 font-bold text-xl mb-2">{brew.name}</div>
        {/* <div className="text-gray-700 font-semibold text-lg mb-2">
          {brew.brewer.name}
        </div> */}
        <div className="text-gray-600 font-bold text-md mb-2">
          {brew.abv}% ABV {brew.ibu} IBU
        </div>
        <p className="truncate ... text-gray-700 text-base mb-2">
          {brew.description}
        </p>
        {/* <p className="text-teal-600 text-base mb-2">
          {" "}
          On tap at {brew.on_taps[0].establishmentByEstablishment.name}
        </p> */}
        {/* <MapComponent position={position} className="flex-auto"></MapComponent> */}
      </div>
    </div>
  );
};

export default BrewItem;
