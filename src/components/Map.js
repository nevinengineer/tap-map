import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "../assets/map.css"
import { Icon } from "leaflet";

const marker = new Icon({
  // iconUrl: "src/components/img/marker.svg",
  iconUrl: require("../static/marker.svg"),
  iconSize: [58/2, 96/2],
  iconAnchor: [58/4, 96/2]
});


const MapComponent = ({position}) => {
  return (
    <Map center={position} zoom={16}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={marker}>
        {/* <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup> */}
      </Marker>
    </Map>
  );
};

export default MapComponent;
