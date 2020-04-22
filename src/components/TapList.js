import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import TapItem from "./TapItem";
import SkeletonLoader from "./SkeletonLoader";
import NoResults from "./NoResults";
import Splash from "./Splash";

const ON_TAP_AT_ESTABLISHMENT = gql`
  query OnTapAtEstablishment($establishment_id: uuid) {
    establishments(where: { id: { _eq: $establishment_id } }) {
      name
    }
    on_tap(
      where: { establishment_id: { _eq: $establishment_id } }
      order_by: { updated: desc }
    ) {
      brewByBrew {
        name
        type
        description
        brewer {
          name
        }
        abv
        ibu
      }
      updated
    }
  }
`;

const TapList = ({ establishment_id }) => {
  const { loading, error, data } = useQuery(ON_TAP_AT_ESTABLISHMENT, {
    variables: { establishment_id },
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
  console.log(data);
  const tapList = [];
  data.on_tap.forEach((index) => {
    tapList.push(<TapItem key={index} index={index} brew={index} />);
  });
  return (
    <div>
      <div className="font-bold text-xl text-justify text-teal-800 m-2 tracking-tight">
        On Tap at {data.establishments[0].name}
      </div>
      <div>
        {data.on_tap.length !== 0 && (
          <div className="flex grid grid-cols-1 overflow-auto max-h-screen">
            {tapList}
          </div>
        )}
        {data.on_tap.length === 0 && (
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
    </div>
  );
};

export default TapList;
