import React, {Component} from 'react';

class JoinPlaylistForm extends Component{
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:8080');
  }

  // componentDidMount() {
  //   this.props._message()
  // }

  render (){
    return(
      <div className="col-xs-6">

      {this.props.playlists}
      </div>
      )
  }
}

export default JoinPlaylistForm;