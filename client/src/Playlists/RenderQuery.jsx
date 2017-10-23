import React, {Component} from 'react';
import Song from './Song.jsx';


class Songs extends Component {
  render() {

    return (
      <div>
        {this.props.track.name}
      </div>
      )
  }
}


export default Songs