import React, {Component} from 'react';
import './Landing.css';
import {Link} from 'react-router-dom';
import Radar from 'radar-sdk-js';
import * as $ from "jquery";

//expiration date for geofences
var d = new Date();
d.setHours(d.getHours() + 24);

const radarKey = "prj_live_pk_b1e32b742d58ca71a80c081038b73b07f5eb773f";
const roomCode = ""

//generate random user ids
const userId = 1234567890;

Radar.initialize(radarKey)
Radar.setUserId(userId);

// //make new geofence
// function createGeofence(lat, lon) {
//   console.log("created")
//   $.ajax({
//     url: 'https://api.radar.io/v1/geofences',
//     type: 'POST',
//     headers: {
//         'Authorization': radarKey,
//     },
//     data: JSON.stringify(
//       {key: radarKey},
//       {description: "music"},
//       {type: "circle"},
//       {coordinates: [lon, lat]},
//       {radius: 10000},
//       {externalId: "12345"},
//       {deleteAfter: d}
//     ),
//     success: response => {
//       console.log(response)
//     }
//   });
// }

Radar.trackOnce(function(err, result) {
  if (!err) {
    var lat = result.location.latitude;
    var lon = result.location.longitude;
    console.log(lat);
    Radar.searchGeofences({
      radius: 1000,
      limit: 1,
    }, function(err, result) {
      if (!err) {
        console.log(result.geofences);
        if (result.geofences.length === 0) {
          //make new geofence
          console.log("no geofences near you")
        } else {
          //join room
          roomCode = result.geofences[0].externalId;
        }
      } else {
        console.log(err)
      }
    });
  } else {
    console.log(err)
  }
});

class RoomNearYou extends Component {
  constructor(props) {
    super(props);
    //store user account info from text inputs
    this.state = {
      roomCode: "",
    };
  }

  render() {
    console.log(roomCode)
    return(
      <div className = "onerow">
        <div className = "right">
          <p className = "emphasize-me-too">{this.props.location}</p>
          <p className = "grayed-out">{this.props.people} people listening</p>
        </div>
        <div className = "left">
          <Link className="button button-sorta-right" to={`/name/74960`}>Join Room</Link>
        </div>

      </div>
    )
  }
}

export default RoomNearYou;
