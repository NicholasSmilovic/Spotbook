import React, {Component} from 'react';

class NewPlaylistForm extends Component{
  render (){
    return(
      <div className="col-xs-6">
        <div className="form-group active-playlist-form">
          <label>New Active Playlists Name</label>
          <input className="form-control" value={this.props.newPlaylistName} onChange={this.props.handlePlaylistsNameKeyPress} />
          <label>New Active Playlists Password</label>
          <input type="password" className="form-control"value={this.props.newPlaylistPassword} onChange={this.props.handlePlaylistsPasswordKeyPress} />
          <button className="btn btn-primary" onClick={() => {this.props.handleFormSubmit(event)}}>Submit</button>
        </div>
        <button className="btn btn-success" onClick={() => {this.props.handleclick(event)}}>ayy</button>
      </div>
      )
  }
}

export default NewPlaylistForm;