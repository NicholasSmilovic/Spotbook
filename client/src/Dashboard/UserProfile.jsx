import React, {Component} from 'react';
import UserMatchSidebar from './UserMatchSidebar.jsx';

class UserProfile extends Component{

  constructor(props) {
    super(props);
  }

  render (){
    return(
        <div className='row'>
          <div className='col-md-12 user-profile'>
          <img src={this.props.user_img} />
          <h1>{this.props.user_name}</h1>
          </div>
        </div>
      )
  }
}

export default UserProfile;