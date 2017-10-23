import React, {Component} from 'react';
import UserMatchSidebar from './UserMatchSidebar.jsx';
import UserProfile from './UserProfile.jsx';
import Navbar from '../partials/Navbar.jsx'

class CurrentUser extends Component {
  render (){
    return(
        <div>
          <UserProfile />
          <UserMatchSidebar />
        </div>
      )
  }
}

export default CurrentUser;