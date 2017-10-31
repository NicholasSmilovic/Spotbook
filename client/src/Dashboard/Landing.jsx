import React, {Component} from 'react';
import SpotifyLogin from './SpotifyLogin.jsx'

class Landing extends Component{
  render (){
    return(
      <div className="dashboard">
          <SpotifyLogin />

      </div>
      )
  }
}

export default Landing;