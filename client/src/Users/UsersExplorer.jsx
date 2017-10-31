import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import UserShortProfile from './UserShortProfile.jsx'


class UsersExplorer extends Component{

  render (){
    const listUsers = this.props.allUsers.map((user, index) => {
      return <UserShortProfile key={user.id} user={user}/>
    })

    return(
      <div className='users-explorer'>
        <h1 className='explore'>Explore</h1><h4>Other Users Related To You</h4>
        {listUsers}
      </div>
    )
  }
}

export default UsersExplorer;