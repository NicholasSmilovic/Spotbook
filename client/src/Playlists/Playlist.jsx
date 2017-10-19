import React, {Component} from 'react';
import New from './new.jsx';


class Playlist extends Component{

  constructor(props) {
    super(props);
    this.state = {
      playlistName: "Rick Sanchez",
      tracksInQueue: ["Steve the wonder", "Green Day"],

    }
  }


  render (){

    return(
      <div>
        <h1>Hello form Playlists :)</h1>
        <New tracks = {this.state.tracksInQueue}/>
      </div>
    )
}
}

export default Playlist;
