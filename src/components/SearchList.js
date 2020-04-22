import React, { useState, Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import BrewItem from "./BrewItem";
import TypeItem from "./TypeItem";
import SkeletonLoader from "./SkeletonLoader";
import NoResults from "./NoResults";

const GET_BREWS_BY_TYPE = gql`
  query BeerOnTapByType($beer_type: String) {
    brews(where: { type: { _ilike: $beer_type } }) {
      id
      abv
      ibu
      name
      description
      brewer {
        name
      }
      on_taps {
        establishmentByEstablishment {
          name
          establishment_location {
            location
          }
        }
      }
    }
  }
`;

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
  const [resultVisibility, setResultVisibility] = useState("hide")

  const handleResultVisibilityClick = () =>{
    if(resultVisibility === "hide"){
      setResultVisibility("show")
    }
    if(resultVisibility === "show"){
      setResultVisibility("hide")
    }

  }
  // const { loading, error, data } = useQuery(GET_BREWS_BY_TYPE, {
  //   variables: { beer_type },
  // });
  const { loading, error, data } = useQuery(SEARCH, {
    variables: { query },
  });
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <SkeletonLoader className="flex-col "></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
      </div>
    );
  }
  if (error) {
    console.error(error);
    return <div> An Error Occured </div>;
  }

  // console.log(data.establishments);
  // console.log(data.brewers);
  // console.log(data.brew_types);
  console.log(data);

  if (data.brew_types.length !== 0) {
    data.brew_types.forEach((type, index) => {
      // console.log(type)
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
      {data.length !== 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleResultVisibilityClick}
            className="text-center font-semibold text-teal-900"
          >
            {resultVisibility} results
          </button>
        </div>
      )}
      {data.brews.length !== 0 && (
        <div>
          <div className="text-center font-bold text-xl text-teal-800 p-2">
            Beers by Name
          </div>
          <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {brewList}
          </div>
        </div>
      )}
      {data.brew_types.length !== 0 && (
        <div>
          <div className="text-center font-bold text-xl text-teal-800 p-2">
            Beers by Type
          </div>
          <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {brewTypeList}
          </div>
        </div>
      )}
      {data.brew_types.length === 0 && data.brews.length === 0 && (
        <div>
          <div className="flex justify-center">
            <NoResults width={"100%"} height={"100%"}></NoResults>
          </div>
          <div className="flex justify-center text-teal-900 font-bold text-xl">
            We're comin' up empty!
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchList;
export { GET_BREWS_BY_TYPE };
