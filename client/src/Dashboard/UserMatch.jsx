import React, {Component} from 'react';
import {
  Link
} from 'react-router-dom'
import $ from 'jquery'

class UserMatch extends Component{
  constructor(props) {
    super(props)
    this.state = {
      userProfile: null
    }
  }

  getUserProfile() {
  return new Promise ((res,rej) => {
  $.get('https://spotifytuner.herokuapp.com/users/getUserByID/'+ this.props.id)
    .done( result => {
      setTimeout(() => res(result), 100)
    })
    .fail( err => {
      console.error(err);
    });
  })
  }

  componentWillMount(){
    this.getUserProfile().then((result) => { this.setState({userProfile: result}) })
  }

  render (){
    let profileLoaded = this.state.userProfile

    let displayName = null
    let userImage = null

    if (profileLoaded) {
      displayName = <Link className='profile-link' to={'/users/' + this.state.userProfile.id}>{this.state.userProfile.display_name}</Link>
      userImage = <img src={this.state.userProfile.image_urls.image} />
    } else {
      displayName = <h2>Loading User...</h2>
      userImage = <img src='http://demo.itsolutionstuff.com/frontTheme/images/loading.gif' />
    }

    return(

      <div className='user-match-profile'>
        {userImage}
        {displayName}
          <h4 style={{paddingTop: '0.5em', textAlign:'center'}}> You are: </h4>
          <h3>{this.props.percent}% matched!</h3>
      </div>
    )
  }
}

export default UserMatch;