import React, {Component} from 'react';
import StickySideBar from '../StickySideBar.jsx'
import Playlist from '../Playlist.jsx';

const genWebSocket = require('../../Models/ActivePlaylistWebSocket.js')


class ActivePlaylists extends Component{
  constructor(props) {
    super(props);
    this.webSocket = null;
    this.state = {
      playlists: null,
      newPlaylistName: "",
      newPlaylistPassword: ""
    }
  }

  _newPlaylists = (data) => {
    this.setState({
      playlists: data
    })
  }

  _emptyNew = () => {
    this.setState({
      newPlaylistName: "",
      newPlaylistPassword: ""
    })
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
    this.setState({
      newPlaylistName: event.target.value
    })
  }

  handlePlaylistsPasswordKeyPress = (event) =>{
    this.setState({
      newPlaylistPassword: event.target.value
    })
  }

  handleFormSubmit = (event) => {
    this.webSocket.startNewActivePlaylist({
      name: this.state.newPlaylistName,
      password: this.state.newPlaylistPassword
    })
  }

  render (){
    let renderPlaylists = null
    if(this.state.playlists) {
      renderPlaylists = this.state.playlists.map((playlist, index)=>{
        return <Playlist  currentUser = {this.props.currentUser}
                          playlist={playlist}
                          accessToken={this.props.accessToken}
                          key={index}/>
      })
    }

    return(
      <div className="row">
        <div className="col-md-2 col-xs-6 text-center sticky-block">
          <StickySideBar accessToken={this.props.accessToken}/>
        </div>
        <div className="col-md-10 col-xs-6 sticky-container">
          <div className="form-group active-playlist-form">
            <label>New Active Playlists Name</label>
            <input className="form-control" value={this.state.newPlaylistName} onChange={this.handlePlaylistsNameKeyPress} />
            <label>New Active Playlists Password</label>
            <input type="password" className="form-control"value={this.state.newPlaylistPassword} onChange={this.handlePlaylistsPasswordKeyPress} />
            <button className="btn btn-primary" onClick={() => {this.handleFormSubmit(event)}}>Submit</button>
          </div>
          <button className="btn btn-success" onClick={() => {this.handleclick(event)}}>ayy</button>
          {renderPlaylists}
        </div>
      </div>
      )
  }
}

export default ActivePlaylists;
