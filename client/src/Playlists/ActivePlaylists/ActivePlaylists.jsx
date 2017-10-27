import React, {Component} from 'react';
import StickySideBar from '../StickySideBar.jsx'
import Playlist from '../Playlist.jsx';
import NewPlaylistForm from './NewPlaylistForm.jsx';
import JoinPlaylist from './JoinPlaylist.jsx';
import CurrentRoom from './CurrentRoom.jsx';

const genWebSocket = require('../../Models/ActivePlaylistWebSocket.js')


class ActivePlaylists extends Component{
  constructor(props) {
    super(props);
    this.webSocket = null;
    this.state = {
      currentPlaylist: "",
      currentPassword: "",
      playlists: null
    }
  }

  _newPlaylists = (data) => {
    this.setState({ playlists: data })
  }

  _joinPlaylist = (name, password) =>{
    this.setState({ currentPlaylist: name, currentPassword: password})
  }

  handleFormSubmit = (data) => {
    this.webSocket.startNewActivePlaylist(data, this.props.accessToken, this.props.currentUser)
  }

  componentDidMount() {
    const stateOperations = {
      newPlaylists: this._newPlaylists,
      joinPlaylist: this._joinPlaylist
    }
    this.webSocket = genWebSocket(stateOperations)
  }

  render (){
    if(!(this.state.currentPlaylist)) {
      return(
      <div className = "row">
          <JoinPlaylist
            playlists={this.state.playlists}
            joinPlaylist={this._joinPlaylist}
            />
          <NewPlaylistForm
            handleFormSubmit = {this.handleFormSubmit}
            newPlaylistName = {this.state.newPlaylistName}
            newPlaylistPassword = {this.state.newPlaylistPassword}
            />
      </div>
      )
    }
    return(
      <div>
        <CurrentRoom
          room = {this.state.currentPlaylist}
          leaveRoom = {this._joinPlaylist}/>
      </div>
      )
  }
}

export default ActivePlaylists;
