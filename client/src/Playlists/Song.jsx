import React, {Component} from 'react';

class Song extends Component{
  render (){
    return(
        <tr>
          <td><img className="img-responsive" src={this.props.song.track.album.images[1].url} /></td>
          <td>{this.props.song.track.name}</td>
          <td className="hidden-xs">{this.props.song.track.artists[0].name}</td>
          <td className="hidden-xs">{this.props.song.track.album.name}</td>
        </tr>
      )
  }
}

export default Song;
