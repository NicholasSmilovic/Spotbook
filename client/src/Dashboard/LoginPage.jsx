import React, {Component} from 'react';



class LoginPage extends Component{
  render (){
    return(
      <div id="user-profile">
        <div className="container">
            <a className='login-button' href="http://localhost:3000/spotify/login">Login With Spotify</a>
          </div>
      </div>
      )
  }
}

export default LoginPage;