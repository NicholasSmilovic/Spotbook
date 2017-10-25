import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link,
  IndexRoute
} from 'react-router-dom'

import UsersExplorer from './Users/UsersExplorer.jsx'
import User from './Users/User.jsx';
import Playlists from './Playlists/Playlists.jsx';
import Landing from './Dashboard/Landing.jsx';
import CurrentUser from './Dashboard/CurrentUser.jsx'
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

    const CurrentUserPage = (props) => {
      return (
        <CurrentUser
        currentSpotifyID = {this.props.currentUser}
        />
      )
    }

    return (
      <Router>
        <div>

          <Navbar />
          <Route exact path="/" component={CurrentUserPage} />
          <Route path="/playlists" component={PlaylistsPage}/>

          <Route exact path="/users" component={UsersExplorer}/>
          <Route path="/users/:id" component={User}/>

        </div>
      </Router>
    )
  }
}

          //   <Route path="/users/:id" component={User}/>
          // </Route>
export default Routes