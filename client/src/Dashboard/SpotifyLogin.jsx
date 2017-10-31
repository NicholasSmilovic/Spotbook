import React, {Component} from 'react';
import queryHelper from '../Helpers/query.jsx'

import CurrentUser from './CurrentUser.jsx';
import LoginPage from './LoginPage.jsx';

class SpotifyLogin extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    }
  }


  render (){

    let loggedInUser = <LoginPage />

    return(
      <div>
        {loggedInUser}
      </div>
      )
  }
}

export default SpotifyLogin;
