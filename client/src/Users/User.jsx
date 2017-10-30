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
        if (primary[i].id === secondary[j].id) {
          common = true
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
      if (arr[j].id === track.id) {
        arr.splice(j,1)

        j -= 1
      }
    }
  })
  return arr
}


generatePlaylist = (trackIDs) => {
  let uriString = ''
  trackIDs.forEach(id => {
    uriString += `spotify%3Atrack%3A${id},`
  })
  uriString = uriString.slice(0, -1) // take off last comma
  let newPlaylistBody = JSON.stringify(
    {
      "description": `My U Complete Me Playlist with ${this.state.user.display_name}`,
      "public": true,
      "name": `${this.props.currentLocal.display_name} <3 ${this.state.user.display_name}`
    }
  )

  fetch(`https://api.spotify.com/v1/users/${this.props.currentLocal.spotify_id}/playlists`, {
    method: "POST",
    Accept: "application/json",
    headers: {
      Authorization: "Bearer " + this.props.accessToken
    },
    body: newPlaylistBody

  })
  .then((response) => {
    if (response.status >= 400) {
      console.log('Error! Playlist not generated')
      return 0
    } else {
      return response.json()
    }
  })
  .then((response) => {
    fetch(`https://api.spotify.com/v1/users/${this.props.currentLocal.spotify_id}/playlists/${response.id}/tracks?uris=${uriString}`, {
      method: "POST",
      Accept: "application/json",
      headers: {
        Authorization: "Bearer " + this.props.accessToken
      }
    })
    .then(() => {
      console.log('playlist generated')
    })
  })



}

  uCompleteMe = () => {
    let you = this.state.user
    let me = this.props.currentLocal
    let yourTopTracks = []
    let myTopTracks = []
    let playlist = []
    let playlistSpotifyIDs = []

    $.get(`http://localhost:3000/users/getUserTopTracks/${you.id}`)
      .then((yourResponse) => {
        yourTopTracks = yourResponse
      })
      .then(() => {
        $.get(`http://localhost:3000/users/getUserTopTracks/${me.id}`)
          .then((myResponse) => {
            myTopTracks = myResponse
          })
          .then(() => {
            let playlistPool = this.findUncommonTracks(yourTopTracks, myTopTracks)
            if (playlistPool.length) {
              let playlistPoolNormalized = this.normalize(myTopTracks, yourTopTracks)
              for (let i = 0; i < 23; i++) {
                playlist.push(playlistPool[Math.floor(Math.random()*Math.random()*(playlistPoolNormalized.length - 1))])
              }

              playlist = this.removeDuplicates(playlist)
              console.log(playlist)
              return playlist
            } else {
              return 0
            }
          })
          .then((response) => {
            if (response !== 0) {
              return Promise.all(response.map(track => {
                return $.get(`http://localhost:3000/tracks/getTrackByID/${track.id}`)
              }))
            } else {
              return 0
            }
          })
          .then((response) => {
            if (response !== 0) {
              response.forEach(track => {
                playlistSpotifyIDs.push(track.spotify_id)
              })
              this.generatePlaylist(playlistSpotifyIDs)
            } else {
              console.log('No playlist available!')
            }
          })
      })
  }



  getUserTrackAudioFeatures = (topTracks) => {
    let danceability = 0
    let energy = 0
    let key = 0
    let loudness = 0
    let mode = 0
    let speechiness = 0
    let acousticness = 0
    let instrumentalness = 0
    let liveness = 0
    let valence = 0
    let tempo = 0

    for (let track in topTracks) {
      danceability += topTracks[track].danceability
      energy += topTracks[track].energy
      key += topTracks[track].key
      loudness += topTracks[track].loudness
      mode += topTracks[track].mode
      speechiness += topTracks[track].speechiness
      acousticness += topTracks[track].acousticness
      instrumentalness += topTracks[track].instrumentalness
      liveness += topTracks[track].liveness
      valence += topTracks[track].valence
      tempo += topTracks[track].tempo
    }

    key = Math.round(key/topTracks.length)
    mode = Math.round(mode/topTracks.length)

    let musicalKeys = {
      1: 'C',
      2: 'C#/Db',
      3: 'D',
      4: 'D#/Eb',
      5: 'E',
      6: 'F',
      7: 'F#/Gb',
      8: 'G',
      9: 'G#/Ab',
      10: 'A',
      11: 'A#/Bb',
      12: 'B'
    }

    let keyString = ''

    for (let musicalKey in musicalKeys) {
      if (musicalKey == key) {
        keyString = musicalKeys[musicalKey]
      }
    }

    let modeString = ''

    if (mode == 1) {
      modeString = 'Maj'
    } else {
      modeString = 'Min'
    }


    let userAudioTrackFeaturesAverages = {
      danceability: danceability/topTracks.length,
      energy: energy/topTracks.length,
      key: keyString,
      loudness: Number(Math.round((loudness/topTracks.length)+'e2')+'e-2'),
      mode: modeString,
      speechiness: speechiness/topTracks.length,
      acousticness: acousticness/topTracks.length,
      instrumentalness: instrumentalness/topTracks.length,
      liveness: liveness/topTracks.length,
      valence: valence/topTracks.length,
      tempo: Number(Math.round((tempo/topTracks.length)+'e2')+'e-2')
    }
    return userAudioTrackFeaturesAverages
  }

  getUserComparisonData(id){
    return new Promise((res, rej) => {
    let userInfo = {
      userID: id,
      topTracks: null,
      topArtists:null,
      userTrackAudioFeatures: null
    }
    $.get('http://localhost:3000/users/getUserTopFullTracks/'+ id)
      .done(topTracks => {
        userInfo.topTracks = topTracks
        userInfo.userTrackAudioFeatures = this.getUserTrackAudioFeatures(topTracks)
        $.get('http://localhost:3000/users/getUserTopFullAbsArtists/' + id)
        .done(absArtists => {
          userInfo.topArtists = absArtists
          res(userInfo)
        })
      })
    })
  }




  componentWillMount () {
    this.getUser().then( user => { this.setState({user}) })
  }


  render () {
    let isLoaded = this.state.user
    let displayName = null
    let explanation = null

    if (isLoaded) {
      displayName = <h1>{this.state.user.display_name}</h1>
      explanation = <div className='w-100 row align-items-center'>
        <div className="col u-complete-me-text">Generate a playlist based on yours and {this.state.user.display_name}'s top tracks!</div>
      </div>

      this.getUserComparisonData(this.state.user.id)
        .then((response) => {
          console.log(response)
        })
    } else {
      let name = 'Lando Calorisian'
      displayName = name
      explanation = <div className='col-md-12 u-complete-me-text'>
        <p>Generate a playlist based on yours and {name}'s top tracks!</p>
      </div>
    }

    return(
      <div>
        <div className='row'>
          <div className='col-md-12 user-profile'>
            <img className='user-profile' src={this.state.user.image_urls.image} />
            {displayName}
            <div className='w-100 row align-items-center'>
              <button className="text-center btn btn-primary u-complete-me" onClick={this.uCompleteMe}>U Complete Me Playlist</button>
            </div>
            {explanation}
          </div>
        </div>
      </div>
    )
  }
}

export default User;
