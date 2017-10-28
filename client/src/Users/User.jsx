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
  getUser = () => {
    return new Promise( (resolve, reject) => {
      fetch(`http://localhost:3000/users/getUserByID/${this.props.match.params.id}`)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          resolve(data)
        })
    })
  }

  findUncommonTracks = (y, m) => {
    let uncommonTracks = []
    uncommonTracks = this.loops(y, m, uncommonTracks)
    uncommonTracks = this.loops(m, y, uncommonTracks)
    return uncommonTracks
  }

  loops = (primary, secondary, uncommonTracks) => {
    for (let i = 0; i < primary.length; i++) {
      let common = false
      for (let j = 0; j < secondary.length; j++) {
        if (primary[i] === secondary[j]) {
          common = true
          break
        }
        if (secondary[j] > primary[i]) {
          break
        }
      }
      if (!common) {
        uncommonTracks.push(primary[i])
      }
    }
    return uncommonTracks

  }

  uCompleteMe = () => {
    let you = this.state.user
    let me = this.props.currentLocal
    let yourTopTracks = []
    let myTopTracks = []
    $.get(`http://localhost:3000/users/getUserTopTracks/${you.id}`)
      .done((yourResponse) => {
        yourTopTracks = yourResponse
      })
      .done(() => {
        $.get(`http://localhost:3000/users/getUserTopTracks/${me.id}`)
          .then((myResponse) => {
            myTopTracks = myResponse
          })
          .then(() => {
            let playlist = []
            let playlistPool = this.findUncommonTracks(yourTopTracks, myTopTracks)
            for (let i = 0; i < 20; i++) {
              playlist.push(playlistPool[Math.floor(Math.random()*Math.random()*(playlistPool.length - 1))])
            }
            console.log(`Your playlist with ${you.display_name} is...`)
            playlist.map(track => {
              return $.get(`http://localhost:3000/tracks/getTrackByID/${track.id}`)
                .done((response) => {
                  console.log(response.track_name)
                })
            })

          })
      })


  }




  componentWillMount () {
    this.getUser().then( user => { this.setState({user}) })
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
