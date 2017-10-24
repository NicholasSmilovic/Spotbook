import React, {Component} from 'react';
import UserMatchSidebar from './UserMatchSidebar.jsx';
import UserProfile from './UserProfile.jsx';
import UserBoxAnalytics from './UserBoxAnalytics.jsx';

class CurrentUser extends Component {
  render (){
    return(
      <div>

        <UserProfile />

        <div className='row'>
          <div className='col-md-3'>
          </div>
          <div className='col-md-6 top-matches-text'>
          <h1 style={{color: 'white'}}>Your Top Musical Matches</h1>
          </div>
          <div className='col-md-3'>
          </div>
        </div>

        <UserMatchSidebar />
        <UserBoxAnalytics />
      </div>
      )
  }
}

export default CurrentUser;