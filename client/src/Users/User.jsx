import React, {Component} from 'react';
import UserBoxAnalytics from '../Dashboard/UserBoxAnalytics.jsx';
import {withRouter} from 'react-router-dom'

import BarChart from '../Charts/_Bar.jsx'
import TopArtistInsight from '../Insights/_TopArtist.jsx'

class User extends Component{
  constructor(props) {
    super(props)
    this.state = {

      chartData: null,
      chartDataRaw: null,
      insightData: null,

      user: {
        display_name: '',
        image_urls: {}
      },
      userAudioTrackFeatures: null
    }
  }

  getUser = () => {
    return new Promise( (resolve, reject) => {
      fetch(`https://spotifytuner.herokuapp.com/users/getUserByID/${this.props.match.params.id}`)
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
      // console.log(this.props.history.push)
      this.props.history.push('/playlists')
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

    $.get(`https://spotifytuner.herokuapp.com/users/getUserTopTracks/${you.id}`)
      .then((yourResponse) => {
        yourTopTracks = yourResponse
      })
      .then(() => {
        $.get(`https://spotifytuner.herokuapp.com/users/getUserTopTracks/${me.id}`)
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
              return playlist
            } else {
              return 0
            }
          })
          .then((response) => {
            if (response !== 0) {
              return Promise.all(response.map(track => {
                return $.get(`https://spotifytuner.herokuapp.com/tracks/getTrackByID/${track.id}`)
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
    $.get('https://spotifytuner.herokuapp.com/users/getUserTopFullTracks/'+ id)
      .done(topTracks => {
        userInfo.topTracks = topTracks
        userInfo.userTrackAudioFeatures = this.getUserTrackAudioFeatures(topTracks)
        $.get('https://spotifytuner.herokuapp.com/users/getUserTopFullAbsArtists/' + id)
        .done(absArtists => {
          userInfo.topArtists = absArtists
          res(userInfo)
        })
      })
    })
  }




  componentWillMount () {
    this.getUser()
    .then( user => { this.setState({user}) })
    .then(() => {

      this.getUserComparisonData(this.state.user.id)
        .then((response) => {
          this.setState({userAudioTrackFeatures: response.userTrackAudioFeatures})
        })
    })
    .then(() => {
      this.getUserTopArtistChartData();
    })

  }


// CURRENT USER
  getUserTopArtistChartData = () => {
    return $.get('https://spotifytuner.herokuapp.com/users/getUserTopTracks/'+this.state.user.id)
    .done( topTrackIDs => {

      let artistIDs = [];
      let artist_track = [];
      let artistByTrack;
      for (let i = 0; i < topTrackIDs.length; i++) {

// GET ARTIST_ID BY TRACK_ID
        artistByTrack = $.get('https://spotifytuner.herokuapp.com/tracks/getArtistFromTrack/'+topTrackIDs[i].id)
        .done( result => {
          artistIDs.push(result.id);
          artist_track.push([result.id, topTrackIDs[i].id])
        })
        .fail( err => {
          console.error(err);
        })
      }

      $.when(artistByTrack).done( () => {
        let chartDetails = this.sortArtists(artist_track);
        // console.log(chartDetails);
        this.setChartDataRaw(chartDetails);
        // console.log(this.state.chartDataRaw)

      });

    })
    .fail( err => {
      console.error(err);
    });
  }

/* artist detail fetching, associated track fetching, setting */
  setChartDataRaw(highLevelDetails) {

    return new Promise( (resolve, reject) => {
      let chartData = {
          labels: [],
          datasets: [{
            label: 'Tracks',
            data: []
          }]
        };
      let chartDataRaw = [];
      return Promise.all(highLevelDetails.map(i => {
        let artistID = i[0];
        return $.get('https://spotifytuner.herokuapp.com/artists/getArtistByID/' + artistID)
      }))
      .then(response => {
        for (let i = 0; i < response.length; i++) {
          if(response[i].artist_name.length > 7) {
            chartData['labels'].push(response[i].artist_name.slice(0,7)+'...')
          } else {
            chartData['labels'].push(response[i].artist_name)
          }
          chartData['datasets'][0]['data'].push(highLevelDetails[i][1].length)
          chartDataRaw.push({artist: response[i], tracks: []})
        }
        // console.log(chartData)
        // console.log(chartDataRaw)
      })
      .then(()=> {
        // console.log('after setting artists')
        // for (let i = 0; i < chartDataRaw.length; i++) {
        return Promise.all(highLevelDetails.map(i => {
        // console.log(i)
          return Promise.all(i[1].map(trackID => {
            return $.get('https://spotifytuner.herokuapp.com/tracks/getTrackByID/'+trackID)
          }))
          .then((response) => {
            // console.log(i[0])
            // console.log((response))
            for (let j = 0; j < chartDataRaw.length; j++) {
              if(chartDataRaw[j]['artist']['id'] === i[0]) {
                chartDataRaw[j]['tracks'] = response
              }
            }

          })
        }))
        .then(() => {
          // console.log(chartDataRaw)
          this.setState({chartData})
          this.setState({chartDataRaw})
        })
      })
    })
      // .then( result => {
      //   this.setState({chartData: result[0]})
      //   this.setState({chartDataRaw: result[1]})
      // })
  }

/* artist sorting, filtering, and top five-ing */
  sortArtists(artist_track) {
    let sorted = artist_track.sort();
    let tally = [];
    let count = 1;

    for (let i = 0; i < sorted.length; i++) {
      let artist = [sorted[i][0], count];
      if (sorted[i+1] === undefined) {
        break;
      } else if (sorted[i][0] === sorted[i+1][0]) {
        count++;
      } else {
        tally.push(artist)
        count = 1;
      }
    }

    tally.sort( (a,b) => {
      return b[1] - a[1];
    });

    tally.splice(10);

    let finalTally = [];

    for (let i = 0; i < tally.length; i++) {
      finalTally.push([tally[i][0], []])
    }

    for (let i = 0; i < sorted.length; i++) {
      for (let j = 0; j < finalTally.length; j++) {
        if (sorted[i][0] === finalTally[j][0]) {
          finalTally[j][1].push(sorted[i][1]);
        }
      }
    }
    return finalTally;
  }


  handleClickElement = (event) => {
    if (event[0]) {
      let index = event[0]['_index'];
      let label = this.state.chartDataRaw[index]['artist']['artist_name'];
      // let insightData = `INDEX: ${index} => ${label}`;

      let insightData = this.state.chartDataRaw[index]
      // console.log(insightData);
      this.setState({ insightData: insightData });
    }
  }


  render () {
    let isLoaded = this.state.user
    let displayName = null
    let explanation = null
    let analytics = null

    if (isLoaded) {
      displayName = <h1>{this.state.user.display_name}</h1>
      explanation = <p className='u-complete-me-text'>Generate a playlist based on yours and {this.state.user.display_name}'s top tracks!</p>
    } else {
      let name = 'Lando Calorisian'
      displayName = name
      explanation = <p className='u-complete-me-text'>Generate a playlist based on yours and {name}'s top tracks!</p>
    }

    if (this.state.userAudioTrackFeatures) {
      analytics = <UserBoxAnalytics userAudioTrackFeatures={this.state.userAudioTrackFeatures} />
    } else {
      analytics = <div>Loading...</div>
    }

    let title = '';
    let data = null;

    if(!this.state.chartData) {
      title = `${this.state.user.display_name}'s Loading  Top Artist Data...`
      data = {
        labels: [
          'LOADING',
          'LOADING',
          'LOADING',
          'LOADING',
          'LOADING',
          'LOADING',
          'LOADING',
          'LOADING',
          'LOADING',
          'LOADING'],
          datasets:[{ label:'Loading...',
          data:[
            Math.random(),
            Math.random(),
            Math.random(),
            Math.random(),
            Math.random(),
            Math.random(),
            Math.random(),
            Math.random(),
            Math.random(),
            Math.random()
          ]
        }]
      }
    } else {
      data = this.state.chartData
      title = `${this.state.user.display_name}'s Top Artists`
    }

    return(
      <div>
        <div className='row'>
          <div className='col-md-12 user-profile'>
            <img className='user-image' src={this.state.user.image_urls.image} />
            {displayName}

          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-4 col-xs-2"></div>
            <div className="col-md-4 col-sm-4 col-xs-8">
              <p className="u-complete-me" onClick={this.uCompleteMe}>U Complete Me Playlist</p>
            </div>
          <div className="col-md-4 col-sm-4 col-xs-2"></div>
        </div>

        <div className="row">
          <div className="col-md-4 col-sm-4 col-xs-2"></div>
            <div className="col-md-4 col-sm-4 col-xs-8">
            {explanation}
            </div>
          <div className="col-md-4 col-sm-4 col-xs-2"></div>
        </div>

        <br/><br/><br/>

        <div className='row'>
          <div className='col-md-6'>
            <BarChart
                chartData={data}

                title={title}
                y_label=""
                x_label=""

                handleClick={ event => this.handleClickElement(event) }
              />
          </div>

          <div className='col-md-6'>
            <TopArtistInsight insightData={this.state.insightData}/>
          </div>
        </div>


        {analytics}
      </div>
    )
  }
}

export default User;
