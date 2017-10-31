import React, {Component} from 'react';
import Songs from '../Songs.jsx';


class CurrentPlaylist extends Component{
  preventDefault = (event) => {
    event.preventDefault();
  }

  handleDrop = (event) => {
    event.preventDefault();
    this.props.addSong(this.props.playlist, JSON.parse(event.dataTransfer.getData('track')))
  }

  leaveRoom = () =>{
    this.props.leaveRoom()
  }

  render (){
    const renderSongs = <Songs
                          playlist={this.props.playlist}
                          accessToken={this.props.accessToken}
                          rerendered = {this.props.rerendered}
                          update = {this.props.update}/>

    return(
      <div>
        <div onDragOver={this.preventDefault} onDrop={(event) => {this.handleDrop(event)}}>
            <header className="playlist-header row text-center sticky-block">
            <div className='col-xl-6 text-center'>
              <h1>{this.props.playlist.name}</h1>
              <button onClick={this.leaveRoom} className="leave-active-button">Leave</button>
            </div>
          </header>
          {renderSongs}
          <hr/>
        </div>
      </div>
    )
  }
}

export default CurrentPlaylist;