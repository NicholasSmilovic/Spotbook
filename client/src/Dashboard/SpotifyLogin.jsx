import React, {Component} from 'react';
import CurrentUser from './CurrentUser.jsx';
import queryHelper from '../Helpers/query.jsx'


// const parseQuery = (queryString) => {
//     var query = {};
//     var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
//     for (var i = 0; i < pairs.length; i++) {
//       var pair = pairs[i].split('=');
//       query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
//     }
//   return query;
// }

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

    return(
      <div>
        <div className="container">
          <div id="login">
            <h1>This is an example of the Authorization Code flow</h1>
            <a href="http://localhost:3000/login" className="btn btn-primary">Log in with Spotify</a>
          </div>
          <div id="loggedin">
              <CurrentUser
                currentUser={this.state.currentUser}
                access_token={this.state.access_token}
                />
                {this.state.access_token}
            <div id="oauth">
            </div>
            <button className="btn btn-default" id="obtain-new-token">Obtain new token using the refresh token</button>
            <button className="btn btn-default" id="obtain-currently-playing"> get stuff</button>
            <button className="btn btn-default wolf-alice-button">Click me!</button>
          </div>
        </div>
      </div>
      )
  }
}

export default SpotifyLogin;
