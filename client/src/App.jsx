import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Routes from './Routes.jsx'

// import User from './Users/User.jsx';
// import Playlists from './Playlists/Playlists.jsx';
import Landing from './Dashboard/Landing.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      userState: null,
      access_token:"",
      refresh_token:""
    }
    this.dashboard = null

    this.refreshAccessToken = () => {
      console.log("http://localhost:3000?" + this.state.refresh_token)
      fetch("http://localhost:3000/spotify/refresh_token/?refresh_token=" + this.state.refresh_token + "/")
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
          })
            this.setState({user:data.id})
          return true
        }
        this.setState({userState: "unverified"})
        return false
      })
    }
  }

  componentWillMount() {
    this.updateTokens()
  }

  componentDidMount() {
    this.verifyLogin()
  }

  render(){
    if(this.state.userState) {
      if(this.state.userState === "verified") {
        return <Routes
                  user = {this.state.user}
                  accessToken = {this.state.access_token}
                  refreshAccessToken = {this.refreshAccessToken}
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
