import React, {Component} from 'react';
import Playlist from '../Playlist.jsx';

class JoinPlaylistForm extends Component{

  render (){
    let renderActive = null
    if (this.props.playlists) {
      renderActive = this.props.playlists.map((playlist, index) => {
        console.log(playlist.spotifyObject)
        return <Playlist currentUser = {this.props.currentUser}
                          playlist={playlist.spotifyObject}
                          accessToken={this.props.accessToken}
                          key={index}/>
      })
    }
    return(
      <div className="col-xs-6">

      {renderActive}
      </div>
      )
  }
}

export default JoinPlaylistForm;