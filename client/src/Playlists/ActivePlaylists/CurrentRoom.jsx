import React, {Component} from 'react';

class Room extends Component{
  render (){
    return(
      <div className="row">
        <div className="col-xs-6">
          {this.props.room}
        </div>
        <div className="col-xs-6">
        </div>
      </div>
      )
  }
}

export default Room;