import React, {Component} from 'react';

class Song extends Component{
  render (){
    return(
        <div>
          <h5>{this.props.song.track.name}</h5>
        </div>
      )
  }
}

export default Song;
