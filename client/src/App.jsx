import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import User from './Users/User.jsx';
import Playlist from './Playlists/Playlist.jsx';
import Landing from './Dashboard/Landing.jsx';

const App = () => (
  <Router >
    <div>
      <div className="row">
        <div className="col-sm-4"><Link to="/">Home</Link></div>
        <div className="col-sm-4"><Link to="/users/1">Users</Link></div>
        <div className="col-sm-4"><Link to="/playlists">Playlists</Link></div>
      </div>

      <hr/>

      <Route exact path="/" component={Landing}/>
      <Route path="/users/:id" component={User}/>
      <Route path="/playlists" component={Playlist}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)


export default App
