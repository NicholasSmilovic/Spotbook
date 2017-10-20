import React, {Component} from 'react';

class Playlist extends Component{
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }

  toggleButton() {
    const currentState= this.state.clicked;
    this.setState({ clicked: !currentState })
  };

    getSongs(url) {
      fetch (url, {
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
        debugger
        this.setState({ playlists: data.items})
      })
    }


  render (){
    let songs = null;
    if (this.state.clicked) {
      songs = (<h1> clicked </h1>)
    } else {
      songs =  (<h1> Not </h1>)
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
