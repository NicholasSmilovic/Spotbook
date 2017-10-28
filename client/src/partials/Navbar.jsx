import React, {Component} from 'react';
import {
  Link
} from 'react-router-dom';

class Navbar extends Component{
  render (){
    return(
        <nav>
          <div className="navWide">
            <div className="wideDiv">
              <Link className='nav-link' to="/">Home</Link>
              <Link className='nav-link' to="/users">Users</Link>
              <Link className='nav-link' to="/playlists">Your Playlists</Link>
              <Link className='nav-link' to="/activeplaylists">Active Playlists</Link>
            </div>
          </div>
          <div className="navNarrow">
            <i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
            <div className="narrowLinks">
              <Link className='nav-link' to="/">Home</Link>
              <Link className='nav-link' to="/users">Users</Link>
              <Link className='nav-link' to="/playlists">Your Playlists</Link>
              <Link className='nav-link' to="/activeplaylists">Active Playlists</Link>
            </div>
          </div>
        </nav>
      )
  }
  burgerToggle() {
    let linksEl = document.querySelector('.narrowLinks');
    if (linksEl.style.display === 'block') {
      linksEl.style.display = 'none';
    } else {
      linksEl.style.display = 'block';
    }
  }
}

export default Navbar;