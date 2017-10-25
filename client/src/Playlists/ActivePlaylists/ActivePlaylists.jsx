import React, {Component} from 'react';
import StickySideBar from '../StickySideBar.jsx'

const genWebSocket = require('../../Models/ActivePlaylistWebSocket.js')


class ActivePlaylists extends Component{
  constructor(props) {
    super(props);
    this.webSocket = genWebSocket;
    this.state = {
      count:0
    }
  }

  _update = (data) => {
    let count = this.state.count + 1
    console.log(count)
    this.setState({
      count: count
    })
  }

  componentDidMount() {
    this.webSocket.initailizeConnection(this._update)
  }


  handleclick = (event) =>{
    this.webSocket.talk()
  }

  render (){
    return(
      <div className="row">
        <div className="col-md-2 col-xs-6 text-center sticky-block">
          <StickySideBar accessToken={this.props.accessToken}/>
        </div>
        <div className="col-md-10 col-xs-6 sticky-container">
          {this.state.count}
          <button onClick={() => {this.handleclick(event)}}>ayy</button>
        </div>
      </div>
      )
  }
}

export default ActivePlaylists;
