import React, {Component} from 'react';
import './Landing.css';
import {firebaseConnect} from 'react-redux-firebase'
import {compose} from 'redux';
import {Link, withRouter} from 'react-router-dom';

class Create extends Component {
  constructor(props) {
    super(props);
    //store user account info from text inputs
    this.state = {
        myroomcode: 0,
        displayname: '',
        people: []
    };
  }

  //Event Change Handler Method for text inputs
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, error: ''});
  }

  generateCode = (event) => {
    this.handleChange(event);
    this.setState({ myroomcode: Math.floor(10000 + Math.random() * 89999) }); 
  }

  createRoom = () => {
    const updates = {};
    const myroomcode = this.state.myroomcode;
    const people = this.state.people.slice().concat(this.state.displayname);
    updates[`/rooms/${myroomcode}/people`] = people;
    this.props.firebase.update("/", updates);
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
              onChange = {this.generateCode}
              className = "input" 
              type = "text" 
              placeholder = "display name"
              value = {this.state.displayname}
            />
            <Link 
              className = "button button-right" 
              onClick = {this.createRoom} 
              to = {`room/${this.state.myroomcode}`}
            >Join Room</Link>

          </div>
        </div>
    </div>
    )
  }
}

export default compose(firebaseConnect(), withRouter)(Create);
