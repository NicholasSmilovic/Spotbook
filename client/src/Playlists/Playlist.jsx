import React, {Component} from 'react';
import Songs from './Songs.jsx';
import Flashes from '../partials/Flashes.jsx';


class Playlist extends Component{
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      flashMessage: false
    }

    this.toggleButton = () => {
      const currentState = this.state.clicked;
      this.setState({ clicked: !currentState })
    };
  }

  preventDefault = (event) => {
    event.preventDefault();
  }

  handleDrop = (event) => {
    event.preventDefault();
    this.addTrackToPlaylist(event.dataTransfer.getData('trackId'))
  }

  addTrackToPlaylist = (trackId) =>{
    const message = "Added " + trackId + " to playlist " + this.props.playlist.name
    this.setState({ flashMessage: message })
  }

  removeFlashState = () => {
    this.setState({ flashMessage: false })
  }

  render (){
    let renderSongs = null
    if(this.state.clicked){
      renderSongs = <Songs playlist={this.props.playlist} accessToken={this.props.accessToken}/>
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
                        <button className="col-xl-2 text-center btn btn-primary playlist-header-button" onClick={this.toggleButton}>Show Tracks</button>
            </header>
            {renderSongs}
            <hr/>
          </div>
        </div>
      )
  }
}

export default Playlist;
