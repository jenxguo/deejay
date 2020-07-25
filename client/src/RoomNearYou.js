import React, {Component} from 'react';
import './Landing.css';
import {firebaseConnect} from 'react-redux-firebase'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link, Redirect} from 'react-router-dom';

class RoomNearYou extends Component {
  constructor(props) {
    super(props);
    //store user account info from text inputs
    this.state = {
    };
  }

  render() {
    return(
      <div className = "onerow">
        <div className = "right">
          <p>{this.props.location}</p>
          <p>{this.props.people}</p>
        </div>
        <div className = "left">
          <Link className = "button button-right" to = "/create">Join Room</Link>
        </div>
          
      </div>
    )
  }
}

export default RoomNearYou;
