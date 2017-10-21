import React, {Component} from 'react';
import Playlist from './Playlist.jsx';


class Playlists extends Component{

  constructor(props) {
    super(props);
    this.state = {
      playlists:[]

    }

  }

  componentDidMount() {
    fetch ("https://api.spotify.com/v1/users/nicholas_smilovic/playlists/6PHdQYCifpEPBZDswKpI34/tracks", {
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
        this.setState({ playlists: data.items})
      })
  }

  render (){
    const renderPlaylists = this.state.playlists.map((playlist, index)=>{
      if(this.state.playlists) {
        return <Playlist playlist={playlist} key={index}/>
      }

    })
    return(
      <div>
        {renderPlaylists}
      </div>
    )
}
}

export default Playlists;
