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
      playlists: null,
      newPlaylistName: "",
      newPlaylistPassword: ""
    }
  }

  _newPlaylists = (data) => {
    this.setState({ playlists: data })
  }

  _emptyNew = () => {
    this.setState({ newPlaylistName: "", newPlaylistPassword: "" })
  }

  _joinPlaylist = (name, password) =>{
    this.setState({ currentPlaylist: name, currentPassword: password})
  }

  componentDidMount() {
    const stateOperations = {
      newPlaylists: this._newPlaylists,
      emptyNew: this._emptyNew
    }
    this.webSocket = genWebSocket(stateOperations)
  }


  handleclick = (event) =>{
    this.webSocket.talk()
  }

  handlePlaylistsNameKeyPress = (event) =>{
    this.setState({ newPlaylistName: event.target.value })
  }

  handlePlaylistsPasswordKeyPress = (event) =>{
    this.setState({ newPlaylistPassword: event.target.value })
  }

  handleFormSubmit = (event) => {
    this.webSocket.startNewActivePlaylist({
      name: this.state.newPlaylistName,
      password: this.state.newPlaylistPassword
    })
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
            handleclick = {this.handleclick}
            handlePlaylistsNameKeyPress = {this.handlePlaylistsNameKeyPress}
            handlePlaylistsPasswordKeyPress = {this.handlePlaylistsPasswordKeyPress}
            newPlaylistName = {this.state.newPlaylistName}
            newPlaylistPassword = {this.state.newPlaylistPassword}
            />
      </div>
      )
    }
    return(
      <div>
        YOU HAVE JOINED A PLAYLIST ROOM
        <CurrentRoom room = {this.state.currentPlaylist} />
      </div>
      )
  }
}

export default ActivePlaylists;
