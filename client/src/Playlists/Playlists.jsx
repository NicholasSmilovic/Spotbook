import React, {Component} from 'react';
import Playlist from './Playlist.jsx';


class Playlists extends Component{

  constructor(props) {
    super(props);
    this.state = {
      playlists:[]
    }

    this.getSongs = () => {
      let accessToken = this.props.accessToken
      let user = this.props.user
      fetch ("https://api.spotify.com/v1/users/"  + user + "/playlists", {
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

  }


  componentDidMount() {
    this.getSongs()
  }

  render (){
    const renderPlaylists = this.state.playlists.map((playlist, index)=>{
      if(this.state.playlists) {
        return <Playlist playlist={playlist} accessToken={this.props.accessToken} key={index}/>
      }
    })

    if(renderPlaylists){
      return <div>{renderPlaylists}</div>
    }

    return(
      <div>
        loading...
      </div>
    )
  }
}

export default Playlists;
