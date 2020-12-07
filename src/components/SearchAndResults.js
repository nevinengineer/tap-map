import React, { useState, useEffect } from "react";
import "../assets/tailwind.css";
import SearchList from "./SearchList";
import SearchBar from "./SearchBar";

const SearchAndResults = ({ onSelectedItem }) => {
  const [query, setQuery] = useState("");

  function handleChildSubmit(query) {
    setQuery(query);
  }

  const handleItemSelect = item => {
    onSelectedItem(item)
  }

  return (
    <div>
      <div className="flex justify-center p-4">
        <SearchBar onChildSubmit={handleChildSubmit}></SearchBar>
      </div>
      {query !== "" && (
        <SearchList
          className="flex"
          query={query}
          onItemSelect={handleItemSelect}
        ></SearchList>
      )}
    </div>
  );
};

export default SearchAndResults;
