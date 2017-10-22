import React, {Component} from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
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
        <StickyContainer>
          <Sticky >
            {
              ({
                style
              }) => {
                return(
                  <header style={style} className="playlist-header row">
                    <div className='col-sm-6 text-center'>
                      <h1>{this.props.playlist.name}</h1>
                    </div>
                    <div className='col-sm-2 playlist-header-column'>
                      <button className="btn btn-primary playlist-header-button" onClick={this.toggleButton}>Show Tracks</button>
                    </div>
                    <div className='col-sm-2 playlist-header-column'>
                      <button className="btn btn-success playlist-header-button">EDIT??</button>
                    </div>
                    <div className='col-sm-2 playlist-header-column'>
                      <button className="btn btn-danger playlist-header-button">DELETE?</button>
                    </div>
                  </header>
                  )
              }
            }
          </Sticky>
            {renderSongs}
        </StickyContainer>
          <hr/>
        </div>
      )
  }
}

export default Playlist;
