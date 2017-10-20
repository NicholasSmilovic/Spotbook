import React, {Component} from 'react';

class User extends Component{
  render (){
    return(
        <div>
        {this.props.match.params.id}
        <h1>Hello form User :)</h1>
        </div>
      )
  }
}

export default User;
