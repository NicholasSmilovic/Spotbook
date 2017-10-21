import React, {Component} from 'react';
import Songs from './Songs.jsx';


class Playlist extends Component{
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }

    this.toggleButton = () => {
      const currentState = this.state.clicked;
      this.setState({ clicked: !currentState })
    };
  }

  render (){
    let renderSongs = null
    if(this.state.clicked){
      renderSongs = <Songs playlist={this.props.playlist} accessToken={this.props.accessToken}/>
    }

    return(
        <div>
          <span>
            <h1>{this.props.playlist.name}</h1>
            <button className="btn btn-primary" onClick={this.toggleButton}>Show Tracks</button>
            <button className="btn btn-success">EDIT??</button>
            <button className="btn btn-danger">DELETE?</button>
            {renderSongs}
          </span>
          <hr/>
        </div>
      )
  }
}

export default Playlist;
