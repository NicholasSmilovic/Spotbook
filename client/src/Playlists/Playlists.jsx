import React, {Component} from 'react';
import Playlist from './Playlist.jsx';
import StickySideBar from './StickySideBar.jsx'


class Playlists extends Component{

  constructor(props) {
    super(props);
    this.state = {
      playlists:[]
    }
  }

  componentDidMount() {
    let accessToken = this.props.accessToken
    fetch ("https://api.spotify.com/v1/users/nicholas_smilovic/playlists", {
      headers: {
        Authorization: "Bearer " + accessToken
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
        return <Playlist playlist={playlist} accessToken={this.props.accessToken} key={index}/>
      }

    })
    return(
      <div className="row">
        <div className="col-sm-2">
          <StickySideBar />
        </div>
        <div className="col-sm-10 search-bar-container">{renderPlaylists}</div>
      </div>
    )
}
}

export default Playlists;
