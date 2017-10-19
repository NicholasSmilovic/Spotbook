import React, {Component} from 'react';
import queryHelper from '../Helpers/query.jsx'

import CurrentUser from './CurrentUser.jsx';
import LoginPage from './LoginPage.jsx';

class SpotifyLogin extends Component{
  constructor(props) {
    super(props);

    let query = queryHelper.queryParse(location.search)

    this.state = {
      access_token:query.access_token,
      refresh_token:query.refresh_token,
      currentUser: {}
    }
  }


  render (){

    let loggedInUser = null
    if (this.state.access_token){
      loggedInUser = <CurrentUser />
    } else {
      loggedInUser = <LoginPage />
    }

    return(
      <div>
        {loggedInUser}
      </div>
      )
  }
}

export default SpotifyLogin;
