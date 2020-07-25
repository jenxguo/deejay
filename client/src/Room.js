import React, {Component} from 'react';
import * as $ from "jquery";

import './Room.css';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

import {firebaseConnect} from 'react-redux-firebase'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link, Redirect} from 'react-router-dom';

const API_KEY = 'AIzaSyDeleToe3CDCGyS8IegRZxUpr3d63balaM';
const fs = require('fs');
const ytdl = require('ytdl-core');

class Room extends Component {
  constructor(props) {
    super(props);
    //store user account info from text inputs
    this.state = {
      videos: [],
      selectedVideo: null,
      search: '',
    };
  }

  //Event Change Handler Method for text inputs
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, error: ''});
  }

  //youtube search api call
  searchYoutube = (searchQuery) => {
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q='+searchQuery+'&key='+API_KEY,
      type: "GET",
      success: response => {
        console.log(response)
        this.setState({
          videos: response.items
        });
      }
    });
  }

  //handle submit search function
  handleSubmit = event => {
    console.log("submit")
    event.preventDefault()
    this.searchYoutube(this.state.search)
  }

  //user selected video
  handleVideoSelect = (video) => {
    this.setState({selectedVideo: video});
    ytdl('http://www.youtube.com/watch?v=A02s8omM_hI')
    .pipe(fs.createWriteStream('video.flv'));
  }

//   //download track from youtube
//   sendURL = (URL) => {
//     fetch(`http://localhost:4000/download?URL=${URL}`, {
//         method:'GET'
//     }).then(res => res.json())
//     .then(json => console.log(json));
// }


  //add song to array of songs w/ name user who added it

  //display song w/ username, runtime, queue order, title + artist

  //let people skip songs, remove songs

  render() {

    let addButton;

    if (this.state.videos) {
      addButton =
        (
          <button>Add Song</button>
        )
    }

    return(
      <div className="room">
        <div className="searchbar">
          <form onSubmit={this.handleSubmit}>
            <h4>Add a song!</h4>
            <label>Search for a song title or artist (the more specific the better)!</label>
            <input name="search" type="text" onChange={this.handleChange} placeholder="Search" value={this.state.search}/>
          </form>
        </div>
          <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
      </div>
    )
  }
}

export default Room;
