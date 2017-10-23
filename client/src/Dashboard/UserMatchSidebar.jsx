import React, {Component} from 'react';
import UserMatch from './UserMatch.jsx'

class UserMatchSidebar extends Component{
  render (){
    return(
        <div className='user-sidebar margin-top26em'>
          <UserMatch />
        </div>
      )
  }
}

export default UserMatchSidebar;