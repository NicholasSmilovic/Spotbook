import React, {Component} from 'react';
import Song from './Song.jsx';


class Songs extends Component {
  constructor(props) {
    super(props);
  }
  //swipe for mobile
  handleDragEvent = (event) => {
    let message = {
      trackURI: this.props.track.uri,
      trackName: this.props.track.name
    }
    event.dataTransfer.setData('track', JSON.stringify(message));
  }

  render() {
    return (
      <div draggable="true" onDragStart={(event) => {this.handleDragEvent(event)}}>
        <img src={this.props.track.album.images[0].url} className="img-responsive" />
        {this.props.track.name}
        {this.props.track.artists[0].name}
        <hr />
      </div>
      )
  }
}


export default Songs