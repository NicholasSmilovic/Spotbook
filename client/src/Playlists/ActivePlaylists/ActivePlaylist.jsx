import React, {Component} from 'react';

class ActivePlaylist extends Component{
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    }
  }
  handleJoin = () => {
    this.props.joinPlaylist(this.props.playlist.name, )
  }

  render (){
    return(
      <div className = "row">
        <div className = "col-sm-5 active-list-header">
          {this.props.playlist.name}
        </div>
        <div className = "col-sm-7 join-active-playlist">
            <label> Password: </label>
            <input className="form-control" value={this.state.password}/>
          <button onClick={this.handleJoin} className = "btn btn-success"> JOIN </button>
        </div>
      </div>
      )
  }
}

export default ActivePlaylist;