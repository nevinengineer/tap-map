import React from "react";
import "../assets/tailwind.css";

const BeerItem = ({ data }) => {
  // const coordinates =
  //   beer.on_taps[0].establishmentByEstablishment.establishment_location
  //     .location.coordinates;
  //     const position = flipLongLat({coordinates})

  return (
 
    // <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 m-2 flex flex-col justify-between leading-normal">
       <div className="border-2 border-gray-400 hover:border-teal-700 rounded-lg m-1">
       <div className="p-2 m-2 flex flex-col justify-between leading-normal">
      {/* <div className="m-2"> */}
        <div className="text-gray-900 font-bold text-l mb-2">{data.name}</div>
        <div className="text-gray-700 font-semibold text-md mb-2">
          {data.brewer.name}
        </div>
        <div className="text-gray-600 font-bold text-sm mb-2">
          {data.abv}% ABV {data.ibu} IBU
        </div>
        <p className="truncate ... text-gray-700 text-base mb-2">
          {data.description}
        </p>
        {/* <p className="text-teal-600 text-base mb-2">
          {" "}
          On tap at {beer.on_taps[0].establishmentByEstablishment.name}
        </p> */}
        {/* <MapComponent position={position} className="flex-auto"></MapComponent> */}
      </div>
    </div>
  );
};

export default BeerItem;
