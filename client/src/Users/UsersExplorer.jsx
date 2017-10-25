import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class UsersExplorer extends Component{
  render (){
    return(
      <div>
        <h1>Hello frmm User :)</h1>
        <Link to="/users/1">USER</Link>
      </div>
    )
  }
}

export default UsersExplorer;