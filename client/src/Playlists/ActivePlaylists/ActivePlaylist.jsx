import React, {Component} from 'react';

class ActivePlaylist extends Component{
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    }
  }

  handleJoin = () => {
    this.props.attemptJoin(this.props.playlist.name, this.state.password)
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  render (){
    return(
      <div className = "row active-playlists">
        <div className = "active-list-header">
          {this.props.playlist.name} (population: {this.props.playlist.users.length})
        </div>
        <div className = "join-active-playlist">
            <label> Password: </label>
            <input className="form-control" onChange={this.handlePasswordChange} value={this.state.password}/>
          <button onClick={this.handleJoin} className = "btn btn-success"> JOIN </button>
        </div>
      </div>
      )
  }
}

export default ActivePlaylist;