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
import Navbar from './partials/Navbar.jsx'


class Routes extends React.Component {
  render() {
    const PlaylistsPage = (props) => {
      return (
          <Playlists
            refreshAccessToken={this.props.refreshAccessTokens}
            accessToken = {this.props.accessToken}
            currentUser = {this.props.currentUser}
            />
        )
    }

    return (
      <Router>
        <div>
          <Navbar />
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