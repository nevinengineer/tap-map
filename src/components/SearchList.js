import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import BeerItem from "./BeerItem";
import VenueItem from "./VenueItem";
import SkeletonLoader from "./SkeletonLoader";

const SEARCH = gql`
query Search($query: String) {
  beers(where: {name: {_ilike: $query}}) {
    name
    ibu
    description
    abv
    id
    brewer {
      name
    }
  }

  venues(where: {name: {_ilike: $query}}) {
    name
    description
    id
    venue_location {
      address
      location
    }
  }


}
`;
const SearchList = ({ query, searched }) => {
  const venueList = [];
  const brewerList = [];
  const beerList = [];
  const [resultVisibile, setResultVisibile] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0)
  const { loading, error, data } = useQuery(SEARCH, {
    variables: { query },
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <SkeletonLoader className="flex-col "></SkeletonLoader>
      </div>
    );
  }
  if (error) {
    console.error(error);
    return <div> An Error Occured </div>;
  }

  if (data.beers.length !== 0) {
    data.beers.forEach((item, index) => {
      beerList.push(<BeerItem key={item.id} index={index} data={item} />);
    });
  }

  if (data.venues.length !== 0) {
    data.venues.forEach((item, index) => {
      venueList.push(<VenueItem key={item.id} index={index} data={item} />);
    })
  }

  return (
    <div>
      {data.length !== 0 && (
        <div className="flex content-center grid grid-cols-1">
          <div className="flex flex-row justify-center w-auto m-1">
            {Object.keys(data).map((key, index) => (
              <button className={`${activeIndex === index ? `bg-teal-700 text-white rounded-full` : `bg-none text-teal-700`} w-1/2 md:w-1/3 lg:w-32 capitalize py-1 mx-1`} key={index} onClick={() => setActiveIndex(index)}> {key}  {"("}{data[key].length}{")"} </button>
            ))}
          </div>

          <button
            onClick={() => setResultVisibile(!resultVisibile)}
            className="text-center font-semibold text-teal-900 mt-2 mb-1"
          >
            {resultVisibile ? "hide" : "show"} results
          </button>
        </div>
      )}
      <div className={`${resultVisibile ? `inline h-auto` : `hidden`}`}>
        {data.beers.length !== 0 && activeIndex === Object.keys(data).indexOf("beers") && (
          <div className="py-4 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {beerList}
          </div>
        )}

        {data.venues.length !== 0 && activeIndex === Object.keys(data).indexOf("venues") && (
          <div className="py-4 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {venueList}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchList;
