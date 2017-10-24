import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Navbar extends Component{
  render (){
    return(
        <div>
          <div className="row nav">
            <div className="col-sm-4 nav-element"><Link className='nav-link' to="/">Home</Link></div>
            <div className="col-sm-4 nav-element"><Link className='nav-link' to="/users/1">Users</Link></div>
            <div className="col-sm-4 nav-element"><Link className='nav-link' to="/playlists">Playlists</Link></div>
          </div>
        </div>
      )
  }
}

export default Navbar;