import React, {Component} from 'react';

class NewPlaylistForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      newPlaylistName: "",
      newPlaylistPassword: ""
    }
  }


  handleclick = (event) =>{
    this.webSocket.talk()
  }

  handlePlaylistsNameKeyPress = (event) =>{
    this.setState({ newPlaylistName: event.target.value })
  }

  handlePlaylistsPasswordKeyPress = (event) =>{
    this.setState({ newPlaylistPassword: event.target.value })
  }

  handleSubmit = (event) =>{
    this.props.handleFormSubmit({ name: this.state.newPlaylistName, password: this.state.newPlaylistPassword})
  }

  render (){
    return(
      <div className="col-xs-6">
        <div className="form-group active-playlist-form">
          <label>New Active Playlists Name</label>
          <input className="form-control" value={this.state.newPlaylistName} onChange={this.handlePlaylistsNameKeyPress} />
          <label>New Active Playlists Password</label>
          <input type="password" className="form-control" value={this.state.newPlaylistPassword} onChange={this.handlePlaylistsPasswordKeyPress} />
          <button className="btn btn-primary" onClick={() => {this.handleSubmit(event)}}>Submit</button>
        </div>
      </div>
      )
  }
}

export default NewPlaylistForm;