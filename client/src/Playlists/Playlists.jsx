import React, {Component} from 'react';
import Playlist from './Playlist.jsx';

import queryHelper from '../Helpers/query.jsx'



class Playlists extends Component{

  constructor(props) {
    super(props);
    let query = queryHelper.queryParse(location.search)
    this.state = {
      playlists:["ayyyy"],
      access_token:query.access_token,
      refresh_token:query.refresh_token

    }

  }

  componentDidMount() {
    fetch ("https://api.spotify.com/v1/me/playlists", {
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
    const renderPlaylists = this.state.playlists.map((playlist)=>{
      return < Playlist playlist={playlist} index={key}/>
    })
    return(
      <div>
        {renderPlaylists}
      </div>
    )
}
}

export default Playlists;
