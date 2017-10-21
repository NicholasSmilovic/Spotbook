import React, {Component} from 'react';
import UserMatchSidebar from './UserMatchSidebar.jsx';
import UserProfile from './UserProfile.jsx';



class CurrentUser extends Component{
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