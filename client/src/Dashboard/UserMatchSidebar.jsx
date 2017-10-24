import React, {Component} from 'react';
import UserMatch from './UserMatch.jsx'

class UserMatchSidebar extends Component{
  render (){
    return(
      <div className='row'>
        <div className='col-md-12 user-sidebar'>
          <UserMatch />
        </div>
      </div>

      )
  }
}

export default UserMatchSidebar;