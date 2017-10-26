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
      access_token:"",
      refresh_token:"",
      allUsers: {}
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
            currentUser: data.id
          })
          return true
        }
        this.setState({userState: "unverified"})
        return false
      })
    }
  }

  getAllUsers() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/users/getAllUsers',
      success: (res) => {
        // console.log('res',res);
        let allUsers = res;
        this.setState({allUsers: allUsers});
      }
    });
  }

  componentWillMount() {
    this.getAllUsers()
    this.updateTokens()
  }

  componentDidMount() {
    this.verifyLogin()
  }

  render(){
    if(this.state.userState) {
      if(this.state.userState === "verified") {
        return <Routes
                  accessToken = {this.state.access_token}
                  refreshAccessToken = {this.refreshAccessToken}
                  currentUser = {this.state.currentUser}
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
