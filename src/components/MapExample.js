import React, { useRef, useState, useEffect } from "react";
import { Map, TileLayer, CircleMarker, Marker, Popup } from "react-leaflet";
import { useQuery } from "@apollo/react-hooks";
import { usePosition } from "../hooks/usePosition";
import gql from "graphql-tag";
import "../assets/map.css";
import { Icon } from "leaflet";
import EstablishmentPopup from "./EstablishmentPopUp";
import TapList from "./TapList";
import LoadingMap from "./LoadingMap";
import Splash from "./Splash";
import SearchAndResults from "./SearchAndResults";

const marker = new Icon({
  iconUrl: require("../static/marker.svg"),
  iconSize: [29, 48],
  iconAnchor: [14, 48],
  popupAnchor: [0, -40],
});

const GET_NEARBY_ESTABLISHMENT_IDS = gql`
  query NearbyEstablishments(
    $distance_kms: Int
    $latitude: float8
    $longitude: float8
  ) {
    search_establishments_near_user(
      args: {
        distance_kms: $distance_kms
        user_lat: $latitude
        user_long: $longitude
      }
    ) {
      establishment_id
      establishment_location
    }
  }
`;

const TapMap = ({ locations }) => {
  const { latitude, longitude, timestamp, accuracy, error } = usePosition();
  const [selected, setSelected] = useState();
  const [establishmentId, setEstablishmentId] = useState(null);
  const [open, setOpen] = useState(false);
  const [onTapArray, setOnTapArray] = useState([]);
  const [zoom, setZoom] = useState(10);
  let distance_kms = 2000;

  const handleMarkerClick = (e) => {
    setEstablishmentId(e.target.options.children.props.establishment_id);
    //setPosition(e.target.options.position);
    
    setOpen(true);
  };

  const handlePointMarkerClick = (e) => {
    console.log(e)
  }

  const { loading, query_error, data } = useQuery(
    GET_NEARBY_ESTABLISHMENT_IDS,
    {
      variables: { distance_kms, latitude, longitude },
    }
  );

  if (loading) {
    return (
      <div>
        <LoadingMap></LoadingMap>
      </div>
    );
  }
  if (query_error) {
    console.error(query_error);
    return <div> An Error Occured </div>;
  }

  if (data) {
    const establishments = data.search_establishments_near_user;
    return (
      <div>
        <SearchAndResults
          onSelectedItem={(item) => {
            handleItem(item);
          }}
        ></SearchAndResults>
        <div className="flex xs:flex-row-reverse sm:flex-row-reverse flex-wrap ">
          <div
            className={`${
              open
                ? `xs:w-screen sm: w-screen md:w-1/2 lg:w-3/5 xl:w-3/5`
                : "w-full"
            } flex`}
          >
            <Map
              center={{
                lat: latitude,
                lng: longitude,
              }}
              zoom={zoom}
            >
              <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
              <PointsLayer selectedIndex={selected} data={establishments} />
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
            {establishmentId !== null && (
              <TapList establishment_id={establishmentId}></TapList>
            )}
          </div>
        </div>
      </div>
    );

    function handleItem(item) {
      var tapArray = [];
      item.on_taps.forEach((element) => {
        tapArray.push(element.establishment_id);
      });
      setOnTapArray(tapArray);
    }
  }

  function PointsLayer(props) {
    const { data, selectedIndex } = props;
    return data.map((item, index) => (
      <PointMarker
        key={index}
        establishment_id={item.establishment_id}
        position={[
          item.establishment_location.coordinates[1],
          item.establishment_location.coordinates[0],
        ]}
        openPopup={onTapArray.includes(item.establishment_id) ? true : false}
      />
    ));
  }

  function PointMarker(props) {
    const markerRef = useRef(null);
    const { position, establishment_id, openPopup } = props;
    useEffect(() => {
      if (openPopup) markerRef.current.leafletElement.openPopup();
    }, [openPopup]);

    return (
      <Marker
        ref={markerRef}
        position={position}
        icon={marker}
        onClick={handleMarkerClick}
      >
        <EstablishmentPopup
          establishment_id={establishment_id}
        ></EstablishmentPopup>
      </Marker>
    );
  }
};

export default TapMap;
