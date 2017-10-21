import React, {Component} from 'react';
import Songs from './Songs.jsx';


class Playlist extends Component{
  constructor(props) {
    super(props);
    this.state = {
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
        this.setState({ playlists: data.items})
      })

  }

  render (){
    let songs = null;
    if (this.state.clicked) {

      songs = <Songs  />
    }
    return(
        <div>
          <button onClick = {this.toggleButton} >
            <h1>{this.props.playlist.name}</h1>
          </button>
          {songs}
        </div>
      )
  }
}

export default Playlist;
