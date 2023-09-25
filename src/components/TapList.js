import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import TapItem from "./TapItem";
import SkeletonLoader from "./SkeletonLoader";
import NoResults from "./NoResults";

const ON_TAP_AT_VENUE = gql`
query BrewsAtEstablishment($venue_id: uuid) {
  venues(where: {id: {_eq: $venue_id}}) {
    name
    venue_beers(order_by: {beer: {name: asc}}) {
      beer {
        id
        abv
        ibu
        name
        type
        subtype
        description
        brewer {
          name
        }
      }
    }
  }
}
`
// const ON_TAP_AT_ESTABLISHMENT = gql`
//   query OnTapAtEstablishment($venue_id: uuid) {
//     venues(where: { id: { _eq: $venue_id } }) {
//       name
//     }
//     on_tap(
//       where: { venue_id: { _eq: $venue_id } }
//       order_by: { updated: desc }
//     ) {
//       beerByBrew {
//         name
//         type
//         description
//         brewer {
//           name
//         }
//         abv
//         ibu
//       }
//       updated
//     }
//   }
// `;

const TapList = ({ venue_id }) => {
  const { loading, error, data } = useQuery(ON_TAP_AT_VENUE, {
    variables: { venue_id },
  });
  if (loading) {
    return (
      <div className="grid grid-cols-1 overflow-auto max-h-screen">
        <SkeletonLoader className="flex-col "></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
        <SkeletonLoader className="flex-col"></SkeletonLoader>
      </div>
    );
  }
  if (error) {
    console.error(error);
    return <div>{error}</div>;
  }
  const tapList = [];
  data.venues[0].venue_beers.forEach((item) => {
    tapList.push(<TapItem key={item.id} index={item.id} data={item.beer} />);
  });
  return (
    <div class="flex flex-col w-full">
      <div className="font-bold text-xl text-center bg-teal-700 text-white md:text-teal-700 md:bg-white lg:text-teal-700 lg:bg-white p-2 rounded-t-lg md:rounded-t-none lg:rounded-t-none whitespace-nowrap">
        On Tap at {data.venues[0].name}
      </div>
      <div>
        {data.venues[0].venue_beers.length !== 0 && (
          <div className="flex grid grid-cols-1 overflow-auto max-h-screen">
            {tapList}
          </div>
        )}
        {data.venues[0].venue_beers.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <NoResults width={"50vmin"} height={"50vmin"}></NoResults>
            <p className="text-teal-700 font-bold text-xl">We're comin' up empty!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TapList;
