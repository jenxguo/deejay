import React, {Component} from 'react';
import * as $ from "jquery";
import YouTube from 'react-youtube'

import './Room.css';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

import {firebaseConnect} from 'react-redux-firebase'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link, withRouter, Redirect} from 'react-router-dom';

const API_KEY = 'AIzaSyDeleToe3CDCGyS8IegRZxUpr3d63balaM';
const fs = require('fs');
const ytdl = require('ytdl-core');

class Room extends Component {
  constructor(props) {
    super(props);
    //store user account info from text inputs
    this.state = {
      searchVideos: [],
      selectedVideo: null,
      search: '',
      songQueue: [],
      currentlyPlaying: 'tlGUom_AV4o',
    };
  }

  //Event Change Handler Method for text inputs
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, error: ''});
  }

  //youtube search api call
  searchYoutube = (searchQuery) => {
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q='+searchQuery+'&key='+API_KEY,
      type: "GET",
      success: response => {
        console.log(response)
        this.setState({
          searchVideos: response.items
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
  }

  //load firebase song list into state

  //save first song in queue into currentlyplaying

  //queue selected video into firebase
  queueSong = () => {
    const id = this.state.selectedVideo.id.videoId;
    const url = "www.youtube.com/watch?v=" + id;
    console.log(url)
  }

  //send currently playing in state queue into youtube embedded audio player
  //look at youtube api?
  //figure out how to get when song finishes playing

  //when song finishes playing, take out first url from state and also from firebase

  //display currently playing song w/ username, runtime, queue order, title + artist

  render() {

    const opts = {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 1,
        controls: 0,
        fs: 0,
      }
    }

    let addButton;
    if (this.state.searchVideos.length != 0) {
      addButton = (<button onClick={this.queueSong}>Add Song</button>)
    }

    return(
      <div className="room">
        <div className="player">
          <YouTube videoId={this.state.currentlyPlaying} opts={opts} />
        </div>
        <div className="searchbar">
          <form onSubmit={this.handleSubmit}>
            <h4>Add a song!</h4>
            <label>Search for a song title or artist (the more specific the better): </label>
            <input name="search" type="text" onChange={this.handleChange} placeholder="Search" value={this.state.search}/>
          </form>
        </div>
          <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.searchVideos}/>
          {addButton}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const people = state.firebase.data['people'];
  const queue = state.firebase.data['queue'];
  return {
    people: people,
    queue: queue,
  };
};

export default compose(
  withRouter,
  firebaseConnect(props => {
    const roomId = props.match.params.roomId
    return [
      {path: `/rooms/${roomId}/people`, storeAs: 'people'},
      {path: `/rooms/${roomId}/queue`, storeAs: 'queue'}
    ];
  }), connect(mapStateToProps)) (Room);
