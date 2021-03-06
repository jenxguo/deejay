import React, {Component} from 'react';
import './Landing.css';
import {Link} from 'react-router-dom';

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
              <h3>Block Party</h3>
              <p className = "small-title">Welcome to the future of music</p>
              <hr></hr>
              <p>Do you miss getting together with friends and jamming to the same music?</p>
              <p>Block Party allows you to reconnect with your friends during quarantine through music!</p>
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
