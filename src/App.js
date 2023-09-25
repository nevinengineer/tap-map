import React, { useState } from "react";
import "./assets/tailwind.css";
import ApolloClient from "apollo-client";
import SearchList from "./components/SearchList";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import VenueMap from "./components/VenueMap";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { usePosition } from "./hooks/usePosition";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://tap-map.hasura.app/v1/graphql/",
    }),
    cache: new InMemoryCache(),
  });
};

const App = () => {
  const client = createApolloClient();
  const [query, setQuery] = useState("");
  const { latitude, longitude } = usePosition();

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
        <VenueMap
          latitude={latitude}
          longitude={longitude}
        ></VenueMap>
      )}
    </ApolloProvider>
  );
};

export default App;
