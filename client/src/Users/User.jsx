import React, {Component} from 'react';

class User extends Component{
  constructor(props) {
    super(props)
    this.state = {
      user: {
        display_name: '',
        image_urls: {}
      }
    }
  }
  // getUser = () => {
  //   return new Promise( (resolve, reject) => {
  //     fetch(`http://localhost:3000/users/getUserByID/${this.props.match.params.id}`)
  //       .then((response) => {
  //         return response.json()
  //       })
  //       .then((data) => {
  //         resolve(data)
  //       })
  //   })
  // }

  uCompleteMe = () => {
    let you = this.state.user
    let me = this.props.currentLocal
    let yourTopTracks = []
    let myTopTracks = []
    $.get(`http://localhost:3000/users/getUserTopTracks/${you.id}`)
      .done((response) => {
        yourTopTracks = response
        console.log(yourTopTracks)

      })
      // .done(() => {
      //   return $.get(`http://localhost:3000/users/getUserTopTracks/${you.id}`)
      // })
      // .done((response) => {
      //   myTopTracks = response
      // })
      // .done(() => {
      //   console.log('Me: ', myTopTracks, 'You:', yourTopTracks)
      // })

  }

  componentWillMount () {
    // this.getUser().then( user => { this.setState({user}) })
  }


  render (){
    this.uCompleteMe()

    return(
        <div>
          <div className='row'>
            <div className='col-md-12 user-profile'>
              <img src={this.state.user.image_urls.image} />
              <h1>{this.state.user.display_name}</h1>
            </div>
          </div>
        </div>
      )
  }
}

export default User;
