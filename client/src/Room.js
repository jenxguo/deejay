import React, {Component} from 'react';
import * as $ from "jquery";
import YouTube from 'react-youtube'

import './Room.css';
import VideoList from './VideoList';
import RecordPlayer from './img/recordplayer.png'
import Send from './img/send.png'
import Skip from './img/skip.png'

import {firebaseConnect} from 'react-redux-firebase'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';

const API_KEY = 'AIzaSyAzVSxGUmoFuuwzgI7zBPx4IwLY6l9w9f0';

class Room extends Component {
  constructor(props) {
    super(props);
    //store user account info from text inputs
    this.state = {
      searchVideos: [],
      selectedVideo: null,
      search: '',
      people: [],
      //array of song objects w/ databaseKey, songId, title, user
      songQueue: [],
      currentlyPlaying: '',
    };
  }

  //load firebase song list + people list into state
  componentDidUpdate(prevProps) {
    const queue = this.props.queue
    if (queue) {
      if (this.props.people !== prevProps.people || queue !== prevProps.queue) {
        //keep the keys somehow?
        var queueArray = Object.keys(queue).map(key => (
          { databaseKey: key, songId: queue[key].id, title: queue[key].title, user: queue[key].user }))

        //Object.values(this.props.queue)
        this.setState({
          people: this.props.people,
          //convert object to array of objects
          songQueue: queueArray,
          currentlyPlaying: queueArray[0],
        });
      }
    }
  }

  //Event Change Handler Method for text inputs
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, error: ''});
  }

  //youtube search api call
  searchYoutube = (searchQuery) => {
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q='+searchQuery+'&videoEmbeddable=true&key='+API_KEY,
      type: "GET",
      success: response => {
        console.log(response)
        this.setState({
          searchVideos: response.items,
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

  //queue selected video into firebase
  addSong = () => {
    //clear search
    this.setState({
      search: '',
      searchVideos: [],
      })


    const roomId = this.props.match.params.id;
    //const roomId = "12345"
    const id = this.state.selectedVideo.id.videoId;
    const title = this.state.selectedVideo.snippet.title;
    const user = this.props.username;

    //will push w/ random key hopefully in chronological order
    const databaseKey = this.props.firebase.push(`/rooms/${roomId}/queue`).key;
    const onComplete = () => {
      console.log(id)
    }
    const updates = {}
    updates[`/rooms/${roomId}/queue/${databaseKey}`] = {
      id: id,
      title: title,
      user: user,
    }
    this.props.firebase.update(`/`, updates, onComplete);
  }

  //when song ends -> remove first song from state + also firebase ALSO SKIP BUTTON
  nextSong = () => {
    const roomId = this.props.match.params.id;
    //const roomId = "12345";
    const key = this.state.currentlyPlaying.databaseKey;
    const path = `/rooms/${roomId}/queue/${key}`;
    const onComplete = () => {
      console.log("next song")
    }
    this.props.firebase.remove(path, onComplete)
  }

  //display currently playing song w/ username, runtime, title + artist

  render() {
    //params for embedded yt player
    const opts = {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 1,
        controls: 0,
        fs: 0,
      }
    }

    //add button appear only when search query has loaded
    let addButton;
    if (this.state.searchVideos.length !== 0) {
      addButton = (<button onClick={this.addSong}>Add Song</button>)
    }

    //last song, add more music message
    let lastSong;
    if (this.state.songQueue.length < 2) {
      lastSong = (<h4>Queue is empty! Add more music to keep the party going!</h4>)
    }

    //current song info
    let current;
    if (this.state.currentlyPlaying) {
      current = (<h3>{this.state.currentlyPlaying.title} added by {this.state.currentlyPlaying.user}</h3>)
    }

    // make the list of people
    const peoplelist = Object.keys(this.state.people).map(i => {
      return (
        <p>
          {this.state.people[i]}
        </p>
      );
    });

    // make the list of songs
    const songlist = Object.keys(this.state.songQueue).map(songitem => {
      return (
        <p>
          {this.state.songQueue[songitem].title}
        </p>
      );
    });

    return(
      <div className="room">
        <div className = "people-list">
          <h3>dj's</h3>
          {peoplelist}
        </div>
        <div className = "middle">
          <div className = "title-and-pic">
            <h2>your neighborhood deejay party</h2>
            <img className = "record-player" src = {RecordPlayer}></img>
          </div>
          <div className = "song-button">
            {current}
            <img src = {Send}></img>
            <button className = "skip-button" onClick={this.nextSong} disabled={this.state.songQueue.length < 2}><img src = {Skip}></img></button>
          </div>
          
          <div className="player">
            <YouTube videoId={this.state.currentlyPlaying.songId} opts={opts} />
          </div>
          <div className="playing">
          {lastSong}
          </div>
          <div className="searchbar">
            <form onSubmit={this.handleSubmit}>
              <h3>Add a song!</h3>
              <input name="search" type="text" onChange={this.handleChange} placeholder="Search" value={this.state.search}/>
            </form>
            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.searchVideos}/>
            {addButton}
          </div>
        </div>
          
        <div className = "song-list">
          <h3>next up...</h3>
          {songlist}
        </div>
        
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
    const roomId = props.match.params.id
    //const roomId = "12345"
    return [
      {path: `/rooms/${roomId}/people`, storeAs: 'people'},
      {path: `/rooms/${roomId}/queue`, storeAs: 'queue'}
    ];
  }), connect(mapStateToProps)) (Room);
