import React from "react";
import { Popup } from "react-leaflet";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import TapItem from "./TapItem";

const GET_ESTABLISHMENTS_AND_TAP = gql`
  query EstablishmentsAndOnTap($establishment_id: uuid, $day: Int) {
    establishments(where: { id: { _eq: $establishment_id } }) {
      name
      description
      establishment_hours(where: { day_open: { _eq: $day } }) {
        close_time
        open_time
        day_open
      }
      establishment_location {
        address
        location
      }
      on_taps {
        brewByBrew {
          name
          ibu
          description
          brewer {
            name
          }
          type
        }
        updated
      }
    }
  }
`;

const EstablishmentPopup = ({ establishment_id }) => {
  let date = new Date();
  let day = date.getDay();
  const { loading, error, data } = useQuery(GET_ESTABLISHMENTS_AND_TAP, {
    variables: { establishment_id, day },
  });
  if (loading) {
    return <Popup>Loading</Popup>;
  }
  if (error) {
    console.error(error);
    return <Popup>{error}</Popup>;
  }

  const establishment_info = data.establishments[0];
  
  return (
    <Popup autoClose={false}>
      {/* <div className="text-teal-800 text-md font-bold text-center">ON TAP AT</div> */}
      <div className="text-teal-900 font-bold text-lg text-center">
        {establishment_info.name}
      </div>
      <div className="text-teal-700 text-m mb-2">
        {establishment_info.establishment_location.address}
      </div>
      {/* <div className="text-gray-900 text-md mb-2 text-center">
                {tapList}
            </div> */}
    </Popup>
  );
};

export default EstablishmentPopup;
