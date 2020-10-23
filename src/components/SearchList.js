import React, { useState, Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import BrewItem from "./BrewItem";
import TypeItem from "./TypeItem";
import SkeletonLoader from "./SkeletonLoader";
import NoResults from "./NoResults";
import LoadingBeer from "./LoadingBeer";

const SEARCH = gql`
  query Search($query: String) {
    establishments(where: { name: { _ilike: $query } }) {
      name
      description
      id
      establishment_location {
        address
        location
      }
    }
    brewers(where: { name: { _ilike: $query } }) {
      name
      id
    }
    brews(where: { name: { _ilike: $query } }) {
      name
      ibu
      description
      abv
      id
      type
      brewer {
        name
      }
      on_taps {
        establishmentByEstablishment {
          establishment_location {
            location
            address
            id
          }
        }
      }
    }
    brew_types(where: { type: { _ilike: $query } }) {
      type
      id
      brews {
        name
        ibu
        description
        type
        abv
        on_taps {
          establishment_id
          establishmentByEstablishment {
            establishment_location {
              address
            }
            name
            id
          }
          updated
        }
      }
    }
  }
`;

const SearchList = ({ query, searched }) => {
  const establishmentList = [];
  const brewerList = [];
  const brewList = [];
  const brewTypeList = [];
  const [resultVisibile, setResultVisibile] = useState(true);
  const { loading, error, data } = useQuery(SEARCH, {
    variables: { query },
  });
  if (loading) {
    return (
      <div className="flex justify-center">
        <LoadingBeer></LoadingBeer>
      </div>
    );
  }
  if (error) {
    // console.error(error);
    return <div> An Error Occured </div>;
  }

  // console.log(data.establishments);
  // console.log(data.brewers);
  // console.log(data.brew_types);
  // console.log(data.brews);
  // console.log(data);

  if (data.brew_types.length !== 0) {
    data.brew_types.forEach((type, index) => {
      brewTypeList.push(<TypeItem key={type.id} index={index} type={type} />);
    });
  }
  if (data.brews.length !== 0) {
    data.brews.forEach((brew, index) => {
      brewList.push(<BrewItem key={brew.id} index={index} brew={brew} />);
    });
  }

  return (
    <div>
      {/* {data.length !== 0 && (
        <div className="flex justify-center">
          <button
            onClick={() => setResultVisibile(!resultVisibile)}
            className="text-center font-semibold text-teal-900 mb-4"
          >
            {resultVisibile ? "hide" : "show"} results
          </button>
        </div>
      )} */}
      {/* <div className={`${resultVisibile ? `h-auto` : `hidden`}`}> */}
      {data.brews.length !== 0 && (
        <div>
          <div className="text-center font-bold text-xl text-teal-800 p-2">
            Beers
          </div>
          <div className="h-auto w-auto overflow-x-scroll">
            <div className="grid grid-rows-1 grid-flow-col gap-4 mx-8">{brewList}</div>
          </div>

          {/* <div className="py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              {brewList}
            </div> */}
        </div>
      )}
      {/* {data.brew_types.length !== 0 && (
          <div>
            <div className="text-center font-bold text-xl text-teal-800 p-2">
              Beers by Type
            </div>
            <div className="py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              {brewTypeList}
            </div>
          </div>
        )} */}
      {data.brew_types.length === 0 && data.brews.length === 0 && (
        <div>
          <div className="flex justify-center">
            <NoResults width={"10%"} height={"10%"}></NoResults>
          </div>
          <div className="flex justify-center text-teal-900 font-bold text-l mb-4">
            We're comin' up empty!
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default SearchList;
