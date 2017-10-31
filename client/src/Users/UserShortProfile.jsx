import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class UserShortProfile extends Component{
  render (){
    return(
        <div className='user-short-profile'>
          <img src={this.props.user.image_urls.image}/>
          <Link className='profile-link' to={'/users/' + this.props.user.id}>{this.props.user.display_name}</Link>
        </div>
      )
  }
}

export default UserShortProfile;