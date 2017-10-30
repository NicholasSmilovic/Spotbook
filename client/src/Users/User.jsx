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


normalize = (yourTopTracks, myTopTracks) => {
  let larger = yourTopTracks
  let smaller = myTopTracks

  if (larger.length < smaller.length) {
    larger = myTopTracks
    smaller = yourTopTracks
  }

  let scale = Math.floor(larger.length/smaller.length)
  let smallerCombo = []

  while (scale) {
    smallerCombo = smallerCombo.concat(smaller)
    scale--
  }

  return larger.concat(smallerCombo)

}


removeDuplicates = (arr) => {
  arr.forEach((track, index) => {
    for (let j = index + 1; j < arr.length; j++) {
      if (arr[j] === track) {
        arr.splice(j,1)

        j -= 1
      }
    }
  })
  return arr
}

  uCompleteMe = () => {
    let you = this.state.user
    let me = this.props.currentLocal
    let yourTopTracks = []
    let myTopTracks = []
    let playlist = []
    let playlistSpotifyIDs = []

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

            let playlistPool = this.findUncommonTracks(yourTopTracks, myTopTracks)
            let playlistPoolNormalized = this.normalize(myTopTracks, yourTopTracks)
            for (let i = 0; i < 20; i++) {
              playlist.push(playlistPool[Math.floor(Math.random()*Math.random()*(playlistPoolNormalized.length - 1))])
            }

            playlist = this.removeDuplicates(playlist)
            return playlist
          })
          .then((response) => {
            console.log(response)
            return Promise.all(response.map(track => {
              return $.get(`http://localhost:3000/tracks/getTrackByID/${track.id}`)
            }))
          })
          .then((response) => {
            response.forEach(track => {
              playlistSpotifyIDs.push(track.spotify_id)
            })
            console.log(playlistSpotifyIDs)
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
