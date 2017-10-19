import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import User from './User.jsx';
import Playlist from './Playlist.jsx';

const App = () => (
  <Router >
    <div>
      <div className="row">
        <div className="col-sm-4"><Link to="/">Home</Link></div>
        <div className="col-sm-4"><Link to="/users">Users</Link></div>
        <div className="col-sm-4"><Link to="/playlists">Playlists</Link></div>
      </div>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/users" component={User}/>
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
