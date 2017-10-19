import React, {Component} from 'react';



class LoginPage extends Component{
  render (){
    return(
      <div id="user-profile">
        <div className="container">
          <div id="login">
            <h1>This is an example of the Authorization Code flow</h1>
            <a href="http://localhost:3000/spotify/login" className="btn btn-primary">Log in with Spotify</a>
          </div>
        </div>
      </div>
      )
  }
}

export default LoginPage;