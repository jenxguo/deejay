import React, {Component} from 'react';
import RoomNearYou from "./RoomNearYou"
import './Landing.css';
import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect, isLoaded} from 'react-redux-firebase'
import {connect} from 'react-redux';
import {compose} from 'redux';

class Join extends Component {
  constructor(props) {
    super(props);
    //store user account info from text inputs
    this.state = {
        roomcode: '',
    };
  }

  //Event Change Handler Method for text inputs
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, error: ''});
  }

  render() {
    // return loading screen if not yet loaded
    if (!isLoaded(this.props.peopleinlocation)) {
      return <div>loading...</div>
    }

    return(
      <div className = "everything">
        <div className = "container">
          <div className = "top">
            <h3>Join Room</h3>
            <p className = "small-title">Ready to vibe?!</p>
            <hr></hr>
            <p>Join a room near you or enter a room code</p>
            <RoomNearYou location = "Wellesley" people = {this.props.peopleinlocation.length}/>
          </div>
          <div className = "bottom">
            <input 
              name = "roomcode"
              onChange = {this.handleChange}
              className = "input" 
              type = "text" 
              placeholder = "room code"
              value = {this.state.roomcode}
            />
            <Link 
              className = "button button-very-right" 
              to = {`name/${this.state.roomcode}`}
            >Join Room</Link>
          </div>
        </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  const peopleinlocation = state.firebase.data['peopleinlocation'];
  return {
    peopleinlocation: peopleinlocation,
  };
};

export default compose(
  withRouter,
  firebaseConnect(props => {
    const roomId = 74960;
    return [
      {path: `/rooms/${roomId}/people`, storeAs: 'peopleinlocation'},
    ];
  }), connect(mapStateToProps)) (Join);
