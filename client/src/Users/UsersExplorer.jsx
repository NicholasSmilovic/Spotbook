import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class UsersExplorer extends Component{
  render (){
    return(
      <div className='well user-short-profile'>
        <img src='https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/13775793_10153610171132687_1785877468594627692_n.jpg?oh=1c88fcbb62a8d746c544b6bbed9b8f9e&oe=5A775134' />
        <Link to="/users/1">USER</Link>
      </div>
    )
  }
}

export default UsersExplorer;