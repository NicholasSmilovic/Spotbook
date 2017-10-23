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
          <header className="playlist-header row text-center sticky-block">
                    <div className='col-xl-6 text-center'>
                      <h1>{this.props.playlist.name}</h1>
                    </div>
                      <button className="col-xl-2 text-center btn btn-primary playlist-header-button" onClick={this.toggleButton}>Show Tracks</button>
                      <button className="col-xl-2 text-center btn btn-success playlist-header-button">EDIT??</button>
                      <button className="col-xl-2 text-center btn btn-danger playlist-header-button">DELETE?</button>
                  </header>
                  {renderSongs}

          <hr/>
        </div>
      )
  }
}

export default Playlist;
