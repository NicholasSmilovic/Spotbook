import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import User from './Users/User.jsx';
import Playlists from './Playlists/Playlists.jsx';
import Landing from './Dashboard/Landing.jsx';
import currentUser from './Dashboard/CurrentUser.jsx'



class Routes extends React.Component {
  render() {
    const PlaylistsPage = (props) => {
      return (
          <Playlists
            user = {this.props.user}
            refreshAccessToken={this.props.refreshAccessTokens}
            accessToken = {this.props.accessToken}
            />
        )
    }

    return (
      <Router >
        <div>
          <div className="row">
            <div className="col-sm-4"><Link to="/">Home</Link></div>
            <div className="col-sm-4"><Link to="/users/1">Users</Link></div>
            <div className="col-sm-4"><Link to="/playlists">Playlists</Link></div>
          </div>

          <hr/>

          <Route  exact path="/"
                  component={currentUser}
                  refreshAccessToken={this.props.refreshAccessTokens}
                  accessToken = {this.props.accessToken}
                  />
          <Route  path="/playlists" component={PlaylistsPage}/>
          <Route path="/users/:id" component={User}/>
        </div>
      </Router>
      )
  }
}

export default Routes