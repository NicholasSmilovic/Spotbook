import React, {Component} from 'react';

class ActivePlaylists extends Component{
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:8080');
  }

  // componentDidMount() {
  //   this.props._message()
  // }

  render (){
    return(
      <div className="row">
      </div>
      )
  }
}

export default ActivePlaylists;