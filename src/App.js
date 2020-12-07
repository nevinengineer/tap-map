import React, { useState, useEffect } from "react";
import "./assets/tailwind.css";
import ApolloClient from "apollo-client";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Splash from "./components/Splash";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import TapMap from "./components/MapExample";

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
  return (
    <ApolloProvider client={client}>
      <NavBar></NavBar>
      <TapMap></TapMap>
    </ApolloProvider>
  );
};

export default App;
