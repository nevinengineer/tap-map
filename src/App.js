import React, { useState, useEffect } from "react";
import "./assets/tailwind.css";
import ApolloClient from "apollo-client";
import SearchList from "./components/SearchList";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Splash from "./components/Splash";
import EstablishmentMap from "./components/EstablishmentMap";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { usePosition } from "./hooks/usePosition";
import LoadingMap from "./components/LoadingMap";
import TapList from "./components/TapList";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://brew-map.herokuapp.com/v1/graphql",
    }),
    cache: new InMemoryCache(),
  });
};

const App = () => {
  const client = createApolloClient();
  const [beerType, setBeerType] = useState("");
  const [query, setQuery] = useState("");
  // const [establishmentId, setEstablishmentId] = useState(null)
  // const latitude = 38.949169;
  // const longitude = -77.338890;
  const { latitude, longitude, timestamp, accuracy, error } = usePosition();

  // function handleChildSubmit(beerType) {
  //   setBeerType(beerType);
  // }
  function handleChildSubmit(query) {
    setQuery(query);
  }
  return (
    <ApolloProvider client={client}>
      <NavBar></NavBar>
      <div className="flex justify-center p-4">
        <SearchBar onChildSubmit={handleChildSubmit}></SearchBar>
      </div>
      {query !== "" && <SearchList className="flex" query={query}></SearchList>}
      {latitude !== undefined && longitude !== undefined && (
        <EstablishmentMap
          latitude={latitude}
          longitude={longitude}
        ></EstablishmentMap>
      )}
      {/* <EstablishmentMap onMarkerClick={handleMarkerClick}></EstablishmentMap> */}
      {/* {beerType === "" && (
        <div className="flex justify-center sm: py-20 md:py-24 lg:py-18 xl:py-32">
          <Splash width={"100%"} height={"100%"}></Splash>
        </div>
      )} */}
      {/* {establishmentId !== null && (<TapList className="flex justify-center" establishment_id={establishmentId} ></TapList>)} */}
    </ApolloProvider>
  );
};

export default App;
