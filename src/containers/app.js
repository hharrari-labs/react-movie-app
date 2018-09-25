import React, { Component } from "react"
import SearchBar from "../components/search-bar"
import VideoDetail from "../components/video-detail"
import Video from "../components/video"
import VideoList from "./video-list"
import axios from "axios"

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIE_URL =
  "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=1f55025027baf12d6a7d4df3501d36c6"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { movieList: {}, currentMovie: {} }
  }
  componentWillMount() {
    this.initMovies()
  }
  initMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIE_URL}&${API_KEY}`).then(
      function(response) {
        this.setState(
          {
            movieList: response.data.results.slice(1, 6),
            currentMovie: response.data.results[0]
          },
          function() {
            this.applyVideoToCurrentMovie()
          }
        )
      }.bind(this)
    )
  }
  applyVideoToCurrentMovie() {
    axios
      .get(
        `${API_END_POINT}movie/${
          this.state.currentMovie.id
        }?${API_KEY}&append_to_response=videos&include_adult=false`
      )
      .then(
        function(response) {
          const youtubeKey = response.data.videos.results[0].key
          let newCurrentMovieState = this.state.currentMovie
          newCurrentMovieState.videoId = youtubeKey
          this.setState({ currentMovie: newCurrentMovieState })
        }.bind(this)
      )
  }
  render() {
    const renderVideoList = () => {
      if (this.state.movieList.length >= 5) {
        return <VideoList movieList={this.state.movieList} />
      }
    }
    return (
      <div>
        <div className="search_bar">
          <SearchBar />
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
            />
          </div>
          <div className="col-md-4">{renderVideoList()}</div>
        </div>
      </div>
    )
  }
}

export default App
