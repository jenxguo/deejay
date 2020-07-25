import React, {Component} from 'react';
import './App.css';

import Landing from './Landing'
import Options from './Options'
import Create from './Create'
import Join from './Join'
import Room from './Room'

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded} from 'react-redux-firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: '',
    };
  }

  callAPI() {
    fetch("http://localhost:8000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
      this.callAPI();
  }

  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <div className="App">
<<<<<<< HEAD
=======
              <p className="App-intro">;{this.state.apiResponse}</p>
>>>>>>> ee384db4e3f46078770900f2a503bf58ccac18f5
              <Landing/>
            </div>
          </Route>
          <Route exact path="/options">
            <div className="App">
              <Options/>
            </div>
          </Route>
          <Route exact path="/create">
            <div className="App">
              <Create/>
            </div>
          </Route>
          <Route exact path="/join">
            <div className="App">
              <Join/>
            </div>
          </Route>
          <Route exact path="/room/:id">
            <div className="App">
              <Room/>
            </div>
          </Route>
          <Route>
            <div>Page not found!</div>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
