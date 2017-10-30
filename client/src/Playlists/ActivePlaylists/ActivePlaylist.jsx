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
    let usersCount = 0
    if(this.props.playlist.users){
      usersCount = this.props.playlist.users.length
    }
    return(
      <div className = "row active-playlists">
        <div className = "active-list-header">
          {this.props.playlist.name} (population: {usersCount})
        </div>
        <div className = "join-active-playlist">
            <input placeholder="password" className="form-control" onChange={this.handlePasswordChange} value={this.state.password}/>
        </div>
          <button onClick={this.handleJoin} className = "new-active-button"> JOIN </button>
      </div>
      )
  }
}

export default ActivePlaylist;