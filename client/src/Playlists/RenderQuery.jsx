import React, {Component} from 'react';
import Song from './Song.jsx';


class Songs extends Component {
  constructor(props) {
    super(props);
  }

  handleDragEvent = (event) => {
    let trackId = this.props.track.id
    event.dataTransfer.setData('trackId', trackId);
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