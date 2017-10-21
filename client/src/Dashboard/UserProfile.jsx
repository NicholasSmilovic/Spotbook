import React, {Component} from 'react';
import UserMatchSidebar from './UserMatchSidebar.jsx';



class UserProfile extends Component{
  render (){
    return(
        <div className='user-profile margin-top6em'>
            <img src='https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/13775793_10153610171132687_1785877468594627692_n.jpg?oh=1c88fcbb62a8d746c544b6bbed9b8f9e&oe=5A775134' />
            <h1>Bryce Walter Parker</h1>
        </div>
      )
  }
}

export default UserProfile;