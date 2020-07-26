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
          <p className = "emphasize-me-too">{this.props.location}</p>
          <p className = "grayed-out">{this.props.people} people listening</p>
        </div>
        <div className = "left">
          <Link className = "button button-sorta-right" to = "/name/74960">Join Room</Link>
        </div>
          
      </div>
    )
  }
}

export default RoomNearYou;
