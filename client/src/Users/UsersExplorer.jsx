import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class UsersExplorer extends Component{
  constructor(props) {
    super(props)
    this.state = {
      allUsers: []
    }
  }

  getAllUsers() {
    $.get('http://localhost:3000/users/getAllUsers')
    .done( result => {
      console.log(result);
    })
    .fail( err => {
      console.error(err);
    });
  }

  componentWillMount() {
    this.getAllUsers()
    console.log('AYY')
  }

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