import React, {Component} from 'react';
import CurrentPlaylist from "./CurrentPlaylist.jsx"
import StickySideBar from "../StickySideBar.jsx"

import Player from './Player.jsx';

class Room extends Component{
  leaveRoom = () =>{
    this.props.leaveRoom()
  }
            // <Line percent="10" strokeWidth="4" strokeColor="#D3D3D3" />

  preventDefault = (event) =>{
    event.preventDefault()
  }

  render (){
    let player = null;
    if(this.props.currentlyPlaying) {
      player = <Player
                  currentlyPlaying = {this.props.currentlyPlaying}
                  users={this.props.users}
                  voteToSkipSong = {this.props.voteToSkipSong}/>
    }


    return(
      <div>
        <div className="row">
          <div className="col-md-2 col-xs-6 text-center sticky-block">
            <StickySideBar accessToken={this.props.accessToken}/>
          </div>
          <div className="col-md-10 col-xs-6 sticky-container">
            <button onClick={this.leaveRoom} className="btn btn-danger">Leave</button>
            {player}
            <CurrentPlaylist
              accessToken={this.props.accessToken}
              playlist={this.props.data}
              currentUser = {this.props.data.owner.id}
              addSong = {this.props.addSong}
              rerendered = {this.props.rerendered}
              update = {this.props.update} />
          </div>
        </div>
      </div>
    )
  }
}

export default Room;