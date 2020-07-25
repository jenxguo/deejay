import React, {Component} from 'react';
import './Landing.css';
import {firebaseConnect} from 'react-redux-firebase'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link, Redirect} from 'react-router-dom';

class Create extends Component {
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
            <h3>Choose Your Screen Name</h3>
            <p className = "small-title">Almost there!</p>
            <hr></hr>
            <p>Enter a display name so everyone will know who chose the latest bop!</p>
          </div>
          <div className = "bottom">
            <input 
              name = "displayname"
              onChange = {this.handleChange}
              className = "input" 
              type = "text" 
              placeholder = "display name"
              value = {this.state.name}
            />
            <Link className = "button button-right" to = {`room/${this.state.roomcode}`}>Join Room</Link>
          </div>
        </div>
        {/* <hr/> */}
        {/* <Link to = "/">go to home</Link> */}
    </div>
    )
  }
}

export default Create;
