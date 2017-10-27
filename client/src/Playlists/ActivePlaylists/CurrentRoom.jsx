import React, {Component} from 'react';

class Room extends Component{
  leaveRoom = () =>{
    this.props.leaveRoom("", "")
  }
  render (){
    return(
      <div className="row">
        <div className="col-xs-6">
          {this.props.room}
          <button onClick={this.leaveRoom} className="btn btn-danger">Leave</button>
        </div>
        <div className="col-xs-6">
        </div>
      </div>
      )
  }
}

export default Room;