import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Map, TileLayer, Marker } from "react-leaflet";
import "../assets/map.css";
import { Icon } from "leaflet";
import VenuePopup from "./VenuePopUp";
import TapList from "./TapList";
import LoadingMap from "./LoadingMap";
import Splash from "./Splash";

const GET_NEARBY_VENUE_IDS = gql`
query NearbyVenues {
  venues {
    venue_location {
      location
    }
    id
  }
}
`;

// const GET_NEARBY_ESTABLISHMENT_IDS = gql`
//   query NearbyEstablishments(
//     $distance_kms: Int
//     $latitude: float8
//     $longitude: float8
//   ) {
//     search_venues_near_user(
//       args: {
//         distance_kms: $distance_kms
//         user_lat: $latitude
//         user_long: $longitude
//       }
//     ) {
//       venue_id
//       venue_location
//     }
//   }
// `;

const marker = new Icon({
  iconUrl: require("../static/marker.svg"),
  iconSize: [29, 48],
  iconAnchor: [14, 48],
  popupAnchor: [0, -40],
});

const VenueMap = ({ latitude, longitude }) => {
  const [venueId, setVenueId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleMarkerClick = (e) => {
    setVenueId(e.target.options.children.props.venue_id);
    setPosition(e.target.options.position);
    setOpen(true);
  };
  const handleMapClick = (e) => {
    setOpen(false);
  };

  const handleZoomChange = (e) => {
    const current_zoom = e.target._zoom;
    setZoom(current_zoom);
  };

  const [position, setPosition] = useState([latitude, longitude]);
  const [zoom, setZoom] = useState(10);
  // let distance_kms = 2000;

  // const { loading, error, data } = useQuery(GET_NEARBY_ESTABLISHMENT_IDS, {
  //   variables: { distance_kms, latitude, longitude },
  // });
  const { loading, error, data } = useQuery(GET_NEARBY_VENUE_IDS);
  if (loading) {
    return (
      <div>
        <LoadingMap></LoadingMap>
      </div>
    );
  }
  if (error) {
    console.error(error);
    return <div> An Error Occured </div>;
  }

  const venues = data.venues

  return (
    <div className="flex xs:flex-row-reverse sm:flex-row-reverse flex-wrap ">
      <div
        className={`${
          open
            ? `xs:w-screen sm: w-screen md:w-1/2 lg:w-3/5 xl:w-3/5`
            : "w-full"
        } flex`}
      >
        <Map
          center={position}
          zoom={zoom}
          minZoom = {2}
          onzoomend={handleZoomChange}
          onclick={handleMapClick}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></TileLayer>
          {venues.map((index) => (
            <Marker
              onClick={handleMarkerClick}
              key={index.id}
              position={[
                index.venue_location.location.coordinates[0],
                index.venue_location.location.coordinates[1],
              ]}
              icon={marker}
            >
              <VenuePopup
                venue_id={index.id}
              ></VenuePopup>
            </Marker>
          ))}
        </Map>
      </div>

      <div
        className={`${
          !open
            ? `xs:flex flex-wrap h-auto sm:flex h-auto flex-wrap md:hidden lg:hidden xl:hidden`
            : "hidden"
        } flex`}
      >
        <div className="flex w-screen justify-center text-teal-900 font-bold text-xl py-6 ">
          Tap a location to see what's on tap!
        </div>
        <div className="flex w-screen justify-center">
          <Splash width={"100%"} height={"60%"}></Splash>
        </div>
      </div>
      <div
        className={`${
          open
            ? `xs:w-screen sm: w-screen h-auto md:w-1/2 lg:w-2/5 xl:w-2/5`
            : "hidden"
        } flex`}
      >
        {venueId !== null && (
          <TapList venue_id={venueId}></TapList>
        )}
      </div>
    </div>
  );
};

export default VenueMap;
export { GET_NEARBY_VENUE_IDS };
