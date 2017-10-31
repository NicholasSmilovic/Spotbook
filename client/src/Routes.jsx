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
import ActivePlaylists from './Playlists/ActivePlaylists/ActivePlaylists.jsx'



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
        currentLocal = {this.props.currentLocal}
        allUsers = {this.props.allUsers}
        />
      )
    }

    const UsersExplorerPage = (props) => {
      return (
        <UsersExplorer
          allUsers= {this.props.allUsers}
        />
      )
    }


    const RenderActivePlaylists = () => {
      return (
        <ActivePlaylists
          accessToken={this.props.accessToken}
          currentUser={this.props.currentUser} />
        )
    }

    const UserPage = (props) => {
      return (
        <User
          {...props}
          currentLocal={this.props.currentLocal}
          accessToken = {this.props.accessToken}
        />
      )
    }

    return (
      <Router>
        <div>

          <Navbar />
          <Route exact path="/" component={CurrentUserPage} />
          <Route exact path="/activeplaylists" component={RenderActivePlaylists} />
          <Route exact path="/playlists" component={PlaylistsPage}/>

          <Route exact path="/users" component={UsersExplorerPage}/>
          <Route path="/users/:id" component={UserPage}/>

        </div>
      </Router>
    )
  }
}

          //   <Route path="/users/:id" component={User}/>
          // </Route>
export default Routes