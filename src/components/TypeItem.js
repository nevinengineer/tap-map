import React from "react";
import MapComponent from "./Map";
import "../assets/tailwind.css";
import BrewItem from "./BrewItem";

const flipLongLat = ({ coordinates }) => {
  const long = coordinates[0];
  const lat = coordinates[1];
  const position = [];
  position.push(lat);
  position.push(long);

  return position;
};

const TypeBrewItem = ({ brew }) => {
  return (
    <div className="mb-2">
      <div className="text-gray-700 font-medium text-md">{brew.name}</div>
      <div className="text-gray-600 font-sm text-md">{brew.abv} % ABV {brew.ibu} IBU </div>
    </div>
  );
};

const TypeItem = ({ type }) => {
  const brewTypeList = [];
  console.log(type);
  type.brews.forEach((brew, index) => {
    brewTypeList.push(<TypeBrewItem key={index} index={index} brew={brew} />);
    // console.log(type)
    // console.log(brew)
  });

  return (
    <div>
      <div className="text-teal-800 font-bold text-l mb-2">
        {" "}
        {type.type + "s"}{" "}
      </div>
      <div>{brewTypeList}</div>
    </div>
  );
};

export default TypeItem;
