import React, {Component} from 'react';
import New from './new.jsx';

import queryHelper from '../Helpers/query.jsx'



class Playlist extends Component{

  constructor(props) {
    super(props);
    let query = queryHelper.queryParse(location.search)
    this.state = {
      playlistName: "Rick Sanchez",
      tracksInQueue: ["Steve the wonder", "Green Day"],
      access_token:query.access_token,
      refresh_token:query.refresh_token

    }

  }


  render (){
    fetch ("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer "+this.state.access_token
      }
    })
      .then((response) => {
        if(response.status >= 400){

        }
        return response.json()
      })
      .then((data) => {
        this.setState({ playlistName: "AAYYYY"})
      })
    return(
      <div>
        <h1>Hello form Playlists :)</h1>
        <New tracks = {this.state.tracksInQueue}/>
        {this.state.playlists}
      </div>
    )
}
}

export default Playlist;
