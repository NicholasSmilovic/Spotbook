import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import User from './Users/User.jsx';
import Playlists from './Playlists/Playlists.jsx';
import Landing from './Dashboard/Landing.jsx';



class Routes extends React.Component {
  render() {
    return (
      <Router >
        <div>
          <div className="row">
            <div className="col-sm-4"><Link to="/">Home</Link></div>
            <div className="col-sm-4"><Link to="/users/1">Users</Link></div>
            <div className="col-sm-4"><Link to="/playlists">Playlists</Link></div>
          </div>

          <hr/>

          <Route exact path="/" component={Landing} updateTokens={this.updateTokens}/>
          <Route path="/playlists" component={Playlists}/>
          <Route path="/users/:id" component={User}/>
        </div>
      </Router>
      )
  }
}

export default Routes