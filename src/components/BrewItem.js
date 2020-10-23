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
  console.log(brew);
  // const coordinates =
  //   brew.on_taps[0].establishmentByEstablishment.establishment_location
  //     .location.coordinates;
  //     const position = flipLongLat({coordinates})

  return (
    // <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 m-2 flex flex-col justify-between leading-normal">
    <div class="w-64 mb-4 rounded-sm shadow-lg p-6">
      {/* <div className="m-2"> */}
      <div className="text-teal-600 font-bold text-lg mb-2">
        {brew.name}
      </div>
      <div className="text-gray-600 italic font-bold text-lg mb-2">
        {brew.type}
      </div>
      <div className="text-gray-900 font-semibold text-md mb-2">
        {brew.brewer.name}
      </div>
      <div className="text-gray-600 font-bold text-sm mb-2 inline-block">
        {brew.abv}% ABV | {brew.ibu == null ? "No" : brew.ibu} IBU
      </div>
      {/* <div className="text-teal-600 font-bold text-lg mb-2">
          {brew.name} | {brew.type}{" "}
        </div> */}

      {/* <p className="truncate ... text-gray-700 text-base mb-2">
          {brew.description}
        </p> */}
      {/* <p className="text-teal-600 text-base mb-2">
          {" "}
          On tap at {brew.on_taps[0].establishmentByEstablishment.name}
        </p> */}
      {/* <MapComponent position={position} className="flex-auto"></MapComponent> */}
    </div>
  );
};

export default BrewItem;
