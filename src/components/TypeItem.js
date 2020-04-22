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
    <div>
        {brew.name}
      {/* <div>{brew.name}</div>
      <div>{brew.description}</div>
      <div>{brew.type}</div>
      <div>
        {brew.abv}% ABV {brew.ibu} IBU
      </div> */}
    </div>
  );
};

const TypeItem = ({ type }) => {
  const brewTypeList = [];
  console.log(type)
  type.brews.forEach((brew, index) => {
    brewTypeList.push(<TypeBrewItem key={index} index={index} brew={brew} />);
    // console.log(type)
    // console.log(brew)
  });

  return (
    <div>
      <div> {type.type +'s'} </div>
      <div>{brewTypeList}</div>
    </div>
  );
};

export default TypeItem;
