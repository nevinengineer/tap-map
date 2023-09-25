import React, { useEffect, useState } from "react";
import "../assets/tailwind.css";
import MapComponent from "./MapComponent";
import { usePosition } from "../hooks/usePosition";

function haversine(lat1, lon1, lat2, lon2) {

  let dLat = (lat2 - lat1) * Math.PI / 180.0;
  let dLon = (lon2 - lon1) * Math.PI / 180.0;

  lat1 = (lat1) * Math.PI / 180.0;
  lat2 = (lat2) * Math.PI / 180.0;

  let a = Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) *
    Math.cos(lat1) *
    Math.cos(lat2);
  let rad = 6371;
  let c = 2 * Math.asin(Math.sqrt(a));
  return rad * c;
}

const VenueItem = ({ data }) => {
  const { latitude, longitude } = usePosition();
  const [distance, setDistance] = useState("--")

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      setDistance(haversine(latitude, longitude, data.venue_location.location.coordinates[0], data.venue_location.location.coordinates[1]))
    }
  }, [data.venue_location.location.coordinates, latitude, longitude])
 
  return (
    <div className="border-2 border-gray-400 hover:border-teal-700 rounded-lg m-1">
      <div className="h-64 p-2 m-2 flex flex-col justify-between leading-normal">
        <div className="text-gray-900 font-bold text-l mb-2">{data.name}</div>
        <div className="text-gray-700 font-semibold text-md mb-2">
          {data.venue_location.address}
          <p className="text-gray-600 font-base text-sm mb-2">{Number.parseFloat(distance).toFixed(1)} miles away</p>
        </div>
          <MapComponent className="h-full" position={data.venue_location.location.coordinates} zoom={20}></MapComponent>
      </div>
    </div>
  );
};

export default VenueItem;