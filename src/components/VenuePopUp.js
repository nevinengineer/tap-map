import React from "react";
import { Popup } from "react-leaflet";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_VENUES_AND_TAPLISTS = gql`
query VenuesAndOnTap($venue_id: uuid) {
    venues(where: {id: {_eq: $venue_id}}) {
      name
      description
      venue_location {
        address
        location
      }
    }
  }
`;

// const GET_ESTABLISHMENTS_AND_TAP = gql`
// query EstablishmentsAndOnTap($venue_id: uuid, $day: Int) {
//     venues(where: {id: {_eq: $venue_id}}) {
//       name
//       description
//       venue_hours(where: {day_open: {_eq: $day}}) {
//         close_time
//         open_time
//         day_open
//       }
//       venue_location {
//         address
//         location
//       }
//       on_taps {
//         brewByBrew {
//           name
//           ibu
//           description
//           brewer {
//             name
//           }
//           type
//         }
//         updated
//       }
//     }
//   }
// `;

const VenuePopup = ({ venue_id }) => {
    // let date = new Date();
    // let day = date.getDay();
    const { loading, error, data } = useQuery(GET_VENUES_AND_TAPLISTS, {
      variables: { venue_id },
  });
    // const { loading, error, data } = useQuery(GET_ESTABLISHMENTS_AND_TAP, {
    //     variables: { venue_id, day },
    // });
    if (loading) {
        return (
            <Popup>
                Loading
            </Popup>

        );
    }
    if (error) {
        console.error(error);
        return <Popup>{error}</Popup>
    }

    const venue_info = data.venues[0]
    return (
        <Popup>
            {/* <div className="text-teal-800 text-md font-bold text-center">ON TAP AT</div> */}
            <div className="text-teal-700 font-bold text-lg text-center">
                {venue_info.name}
            </div>
            <div className="text-teal-600 text-m mb-2">
                {venue_info.venue_location.address}
            </div>
        </Popup>
    )

};

export default VenuePopup;