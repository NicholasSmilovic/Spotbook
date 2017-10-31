import React, {Component} from 'react';
import Songs from './Songs.jsx';
import Flashes from '../partials/Flashes.jsx';


class Playlist extends Component{
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      update: false,
      flashMessage: false
    }

    this.toggleButton = () => {
      const currentState = this.state.clicked;
      this.setState({ clicked: !currentState })
    };
  }

  encodeData = (data) => {
    return Object.keys(data).map(function(key) {
      return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
  }

  preventDefault = (event) => {
    event.preventDefault();
  }

  handleDrop = (event) => {
    event.preventDefault();
    this.addTrackToPlaylist(JSON.parse(event.dataTransfer.getData('track')))
  }

  escapeColons = (string) => {
    return string.split(":").join("%3A")
  }

  removeFlashState = () => {
    this.setState({ flashMessage: false })
  }

  rerendered = () =>{
    this.setState({ update: false })
  }

  addTrackToPlaylist = (track) =>{
    const message = "Added " + track.trackName + " to playlist " + this.props.playlist.name
    const spotifyURI = this.escapeColons(track.trackURI)
    const accessToken = this.props.accessToken
    fetch("https://api.spotify.com/v1/users/" + this.props.currentUser + "/playlists/" + this.props.playlist.id + "/tracks?uris=" + spotifyURI,{
      method: "POST",
      Accept: "application/json",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState({
        flashMessage: message,
        update: true
       })
    })
  }

  render (){
    let renderSongs = null
    if(this.state.clicked){
      renderSongs = <Songs  playlist={this.props.playlist}
                            accessToken={this.props.accessToken}
                            rerendered = {this.rerendered}
                            update = {this.state.update}/>
    }

    let flashMessage = null
    if (this.state.flashMessage) {
      flashMessage = <Flashes content = {this.state.flashMessage} removeFlashState={this.removeFlashState}/>
    }

    return(
        <div>
          {flashMessage}
          <div onDragOver={this.preventDefault} onDrop={(event) => {this.handleDrop(event)}}>
            <header className="playlist-header row text-center sticky-block">
                      <div className='col-xl-6 text-center'>
                        <h1>{this.props.playlist.name}</h1>
                      </div>
                        <p className="show-tracks-button col-xl-2 text-center playlist-header-button" onClick={this.toggleButton}>Show Tracks</p>
            </header>
            {renderSongs}
            <br/>
          </div>
        </div>
      )
  }
}

export default Playlist;
