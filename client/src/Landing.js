import React, {Component} from 'react';
import './Landing.css';
import {firebaseConnect} from 'react-redux-firebase'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link, Redirect} from 'react-router-dom';

class Landing extends Component {
  constructor(props) {
    super(props);
    //store user account info from text inputs
    this.state = {
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
              <h3>Dee Jay</h3>
              <p className = "small-title">Welcome to the future of music</p>
              <hr></hr>
              <p>Do you miss getting together with friends and jamming to the same music?</p>
              <p>Dee Jay allows you to reconnect with your friends during quarantine through music!</p>
              <p>You can create rooms and invite your friends to listen to the same songs together, as well as joining music listening parties for your own neighborhood as well!</p>
              <p className = "emphasize-me">No downloads.  No signup.  No hassle.</p>
            </div>
            <div className = "bottom">
              <Link className = "button button-right" to = "/options">Start Listening</Link>
            </div>
        </div>
        {/* <hr/> */}
        {/* <Link to = "/">go to home</Link> */}
    </div>
    )
  }
}

export default Landing;
