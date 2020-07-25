import axios from 'axios';
const KEY = 'AIzaSyDeleToe3CDCGyS8IegRZxUpr3d63balaM';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
      part: 'snippet',
      maxResults: 5,
      key: KEY,
  }
})
