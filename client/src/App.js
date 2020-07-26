import React, {Component} from 'react';
import './App.css';

import Landing from './Landing'
import Options from './Options'
import Create from './Create'
import Join from './Join'
import Name from './Name'
import Room from './Room'

import Radar from 'radar-sdk-js'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

const radarKey = "prj_live_pk_b1e32b742d58ca71a80c081038b73b07f5eb773f";
Radar.initialize(radarKey)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: '',
      username: '',
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

  updateUsername = username => {
    this.setState({ username: username })
  }

  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <p className="App-intro">;{this.state.apiResponse}</p>
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
              <Create updateUsername={this.updateUsername} />
            </div>
          </Route>
          <Route exact path="/join">
            <div className="App">
              <Join/>
            </div>
          </Route>
          <Route exact path="/name/:id">
            <div className="App">
              <Name updateUsername={this.updateUsername} />
            </div>
          </Route>
          <Route exact path="/room/:id">
            <div className="App">
              <Room username={this.state.username}/>
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
