import React, {Component} from 'react';
import Song from './Song.jsx';


class Songs extends Component {


  handleDragEvent(event){
    debugger
    event.dataTransfer.setData('text', "AAYY");
  }

  render() {
    // debugger
        // <img src={this.props.track.album.images[0].url} className="img-responsive" />
    return (
      <div draggable="true" onDragStart={this.handleDragEvent}>
        {this.props.track.name}
        {this.props.track.artists[0].name}
        <hr />
      </div>
      )
  }
}


export default Songs