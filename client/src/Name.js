import React, {Component} from 'react';
import './Landing.css';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link, withRouter} from 'react-router-dom';

class Name extends Component {
  constructor(props) {
    super(props);
    //store user account info from text inputs
    this.state = {
        name: ''
    };
  }

  //Event Change Handler Method for text inputs
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, error: ''});
    this.props.updateUsername(event.target.value)
  }

  joinRoom = () => {
    const updates = {};
    const oldpeople = this.props.people;
    const people = oldpeople.slice().concat(this.state.name);
    updates[`/rooms/${this.props.match.params.id}/people`] = people;
    this.props.firebase.update("/", updates);
  }

  render() {
    // return loading screen if not yet loaded
    if (!isLoaded(this.props.people)) {
      return <div>loading...</div>
    }

    // the case where deckid doesn't exist
    if (isEmpty(this.props.people)) {
      return <div>wrong room key!  no one is in the room with the room key you entered.  make sure you have the correct key or try creating a room instead!</div>
    }
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
              name = "name"
              className = "input"
              type = "text"
              placeholder = "display name"
              onChange = {this.handleChange}
              value = {this.state.name}
            />
            <Link
              className = "button button-right"
              onClick = {this.joinRoom}
              to = {`../room/${this.props.match.params.id}`}
            >Join Room</Link>

          </div>
        </div>
    </div>
    )
  }
}

// takes redux global state and returns info as props!
// check if deck is loaded before by short circuiting
const mapStateToProps = (state, props) => {
    const people = state.firebase.data['people'];
    return { people: people };
  }

export default compose(
    withRouter,
    firebaseConnect(props => {
      const roomcode = props.match.params.id;
      return [{ path: `/rooms/${roomcode}/people`, storeAs: 'people'}]
    }),
    connect(mapStateToProps)
  )(Name);
