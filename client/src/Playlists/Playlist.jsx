import React, {Component} from 'react';
import Songs from './Songs.jsx';


class Playlist extends Component{
  constructor(props) {
    super(props);
    this.state = {
      songs:[],
      clicked: false
    }

    this.toggleButton= ()=> {
      const currentState = this.state.clicked;
      this.setState({ clicked: !currentState })
    };
  }

  componentDidMount() {
      fetch (this.props.playlist.tracks.href, {
      headers: {
        Authorization: "Bearer " + this.state.access_token
      }
    })
      .then((response) => {
        if(response.status >= 400){

        }
        return response.json()
      })
      .then((data) => {
        this.setState({ songs: data.items})
      })

  }

  render (){
    let renderSongs = null;
    if(this.state.clicked && this.state.songs){
      let renderSongs = this.state.songs.map((song, index)=>{
        return <Song song={song} key={index}/>
      })
    }

    return(
        <div>
          <button onClick = {this.toggleButton} >
            <h1>{this.props.playlist.name}</h1>
          </button>
          {renderSongs}
        </div>
      )
  }
}

export default Playlist;
