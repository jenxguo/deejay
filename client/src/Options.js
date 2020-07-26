import React, {Component} from 'react';
import './Landing.css';
import {Link} from 'react-router-dom';

class Options extends Component {
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
              <h3>Start Listening</h3>
              <p className = "small-title">Which track do you want?</p>
              <hr/>
              <div className = "button-container">
                <Link className = "button" to = "/join">Join Room</Link>
                <br />
                <br />
                <br />
                <Link className = "button" to = "/create">Create Room</Link>
              </div>
              
            </div>
        </div>
        {/* <hr/> */}
        {/* <Link to = "/">go to home</Link> */}
    </div>
    )
  }
}

export default Options;
