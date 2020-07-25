import React, {Component} from 'react';
import RoomNearYou from "./RoomNearYou"
import './Landing.css';
import {firebaseConnect} from 'react-redux-firebase'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link, Redirect} from 'react-router-dom';

class Join extends Component {
  constructor(props) {
    super(props);
    //store user account info from text inputs
    this.state = {
        roomcode: '00000',
        displayname: ''
    };
  }

  //Event Change Handler Method for text inputs
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, error: ''});
  }

  render() {

    return(
      <div className = "everything">
        <div className = "container">
          <div className = "top">
            <h3>Join Room</h3>
            <p className = "small-title">Ready to vibe?!</p>
            <hr></hr>
            <p>Join a room near you or enter a room code</p>
            <RoomNearYou location = "Wellesley" people = "6"/>
            <RoomNearYou location = "Needham" people = "8"/>
          </div>
          <div className = "bottom">
            <input 
              name = "displayname"
              onChange = {this.handleChange}
              className = "input" 
              type = "text" 
              placeholder = "room code"
              value = {this.state.name}
            />
            <Link className = "button button-very-right" to = "/create">Join Room</Link>
          </div>
        </div>
        {/* <hr/> */}
        {/* <Link to = "/">go to home</Link> */}
    </div>
    )
  }
}

export default Join;
