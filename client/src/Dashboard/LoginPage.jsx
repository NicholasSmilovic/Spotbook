import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'


class LoginPage extends Component{
  render (){
    return(
      <div>
        <div className="row top-div">
          <div className="col-md-4 col-sm-4 col-xs-2"></div>
            <div className="col-md-4 col-sm-4 col-xs-8">
               <h1 className='app-name'>TUNER.</h1>
            </div>
          <div className="col-md-4 col-sm-4 col-xs-2"></div>
        </div>

        <div className="row tag-div">
          <div className="col-md-4 col-sm-4 col-xs-2"></div>
            <div className="col-md-4 col-sm-4 col-xs-8">
               <p className='tagline'>Dial in your Spotify experience.</p>
            </div>
          <div className="col-md-4 col-sm-4 col-xs-2"></div>
        </div>

        <div className="row force-to-bottom">
          <div className="col-md-4 col-sm-4 col-xs-2"></div>
            <div className="col-md-4 col-sm-4 col-xs-8">
               <p className='login-button'><a href="https://spotifytuner.herokuapp.com/spotify/login">Login With Spotify</a></p>
            </div>
          <div className="col-md-4 col-sm-4 col-xs-2"></div>
        </div>
      </div>
      )
  }
}

export default LoginPage;
