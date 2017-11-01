import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Routes from './Routes.jsx'
import $ from 'jquery'

// import User from './Users/User.jsx';
// import Playlists from './Playlists/Playlists.jsx';
import Landing from './Dashboard/Landing.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userState: null,
      currentUser: null,
      currentLocal: null,
      access_token:"",
      refresh_token:"",
      allUsers: {},
      compatibleUsers: []
    }
    this.dashboard = null

    this.refreshAccessToken = () => {
      console.log("https://spotifytuner.herokuapp.com?" + this.state.refresh_token)
      fetch("https://spotifytuner.herokuapp.com/spotify/refresh_token/?refresh_token=" + this.state.refresh_token + "/")
      .then((response) => {
        if(response.status >= 400){
          console.log("refresh error")
        }
        return response.json()
      })
      .then((data) => {
        debugger
      })
    }

    this.queryParse = (queryString) => {
      var query = {};
      var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
      }
      return query;
    }

    this.updateTokens = () => {
      if(location.search){
        let query = this.queryParse(location.search)
        this.setState({
          access_token: query.access_token,
          refresh_token: query.refresh_token
        })
        this.render()
      }
      return false
    }

    this.verifyLogin = () => {
      fetch("https://api.spotify.com/v1/me",{
        headers: {
          'Authorization': 'Bearer ' + this.state.access_token
        }
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if(data.id){
          this.setState({
            userState: "verified",
            currentUser: data.id
          })
          this.setCurrentLocalUser();
          return true
        }
        this.setState({userState: "unverified"})
        return false
      })
    }

    this.getAllUsers = () => {
      return new Promise ( (resolve, reject) => {
        fetch('https://spotifytuner.herokuapp.com/users/getAllUsers')
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            resolve(this.setState({allUsers: data}))
          })
      });
    }

    // this.userCompatibility = () => {
    //   console.log(this.state.currentUser)
    //   console.log(this.state.allUsers[0].spotify_id)
    //   this.state.allUsers.map((user) => {
    //     if (user.spotify_id !== this.state.currentUser) {
    //       console.log(user)
    //     }
    //       })
    //       return true
    //     }
    //     this.setState({userState: "unverified"})
    //     return false
    //   })
    // }
  }

  componentWillMount() {
    this.updateTokens()
    this.getAllUsers()
  }

  componentDidMount() {
    this.verifyLogin()
  }

  setCurrentLocalUser() {
    $.get('https://spotifytuner.herokuapp.com/users/getUserBySpotifyID/'+ this.state.currentUser)
    .done( result => {
      this.setState({ currentLocal: result });
    })
    .fail( err => {
      console.error(err);
    });
  }

  render(){
    if(this.state.userState) {
      if(this.state.userState === "verified") {

        return <Routes
                  accessToken = {this.state.access_token}
                  refreshAccessToken = {this.refreshAccessToken}
                  currentUser = {this.state.currentUser}
                  currentLocal = {this.state.currentLocal}
                  allUsers = {this.state.allUsers}
                  />
      }
      if(this.state.userState === "unverified") {
        return <Landing />
      }
    }
    return <div>Loading</div>
  }
}


export default App;
