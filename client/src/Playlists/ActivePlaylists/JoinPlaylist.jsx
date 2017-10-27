import React, {Component} from 'react';
import Playlist from '../Playlist.jsx';
import ActiveQuery from './ActiveQuery.jsx';
import ActivePlaylist from './ActivePlaylist.jsx';

class JoinPlaylistForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    }
  }

  _query = (data) => {
    this.setState({ query: data })
  }

  render (){
    let regex = RegExp(this.state.query);
    let renderActive = null
    if (this.props.playlists) {
      renderActive = this.props.playlists.map((playlist, index) => {
        if(regex.test(playlist.name)){
          return (
            <div>
              <ActivePlaylist
                currentUser = {this.props.currentUser}
                playlist={playlist}
                accessToken={this.props.accessToken}
                attemptJoin = {this.props.attemptJoin}
                key={index}/>
            </div>
            )
        }
      })
    }
    return(
      <div className="col-sm-6 sticky-container">
        <div className="sticky-block playlist-header">
          <h1> Join a Room </h1>
          <ActiveQuery
            setQuery = {this._query}
            query = {this.state.query}/>
          <hr />
        </div>
        {renderActive}
      </div>
      )
  }
}

export default JoinPlaylistForm;