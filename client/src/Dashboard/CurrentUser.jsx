import React, {Component} from 'react';

import UserMatchSidebar from './UserMatchSidebar.jsx';
import UserProfile from './UserProfile.jsx';
import UserBoxAnalytics from './UserBoxAnalytics.jsx';

import SampleData from '../Charts/SampleChartData.jsx'

import Prettiness from '../Charts/Prettiness.jsx'
import Palette from '../Charts/Palette.jsx'
import BarChart from '../Charts/_Bar.jsx'


import TopArtistInsight from '../Insights/_TopArtist.jsx'
import { parse } from 'query-string'
import compatibilityFunctions from '../../../user-compatibility.js'



class CurrentUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartData:{},
      insightData: 'Click bar on chart for more info!',
      topTracks:[],
      topArtists:[],
      userAudioTrackFeatures: {},
      allUsersTopTracks: [],
      allUsersTopArtists: [],
      allUsersAudioTrackFeatures: {},
      allUsersComparisonData: [],
      insightData:'Stuff',
      compatibleUsers: []
    }

    this.getUserTrackAudioFeatures = (topTracks) => {
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


      let userAudioTrackFeaturesAverages = { danceability: danceability/topTracks.length,
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

    this.userCompatibility = () => {

      function findUserIndex(arr, uid) {
        for(let idx in arr) {
          // console.log(arr[idx].id)
          if(arr[idx].id === uid) { return idx; }
        }
        throw "should never get here";
      }

      for (let user in this.props.allUsers) {
        // let newUserComparisonData = this.state.allUserComparisonData.concat([]);
        let idx = findUserIndex(this.state.allUsersComparisonData, this.props.allUsers[user].id);
        console.log(this.getUserTopTracks(this.props.allUsers[user].id))

      }



        // this.getUserTopAbsArtists(this.props.allUsers[user].id).then(() => {
        //   this.getUserTopTracks(this.props.allUsers[user].id)
        // }).then(() => {
        // let allUsersComparisonData = this.state.allUsersComparisonData
        // allUsersComparisonData.push({id: this.props.allUsers[user].id,
        //                              topTracks: this.state.allUsersTopTracks,
        //                              topArtists: this.state.allUsersTopArtists,
        //                              audioTrackFeatures: this.state.allUsersAudioTrackFeatures})
        // })
    }
  }

  componentWillMount(){
    this.getChartData();

    if (!this.props.currentLocal) {
      // console.log('Please stand by while we get that thing that you need.')
    } else {
      // console.log("We got it. The thing that you need immediately follows this sentence.")
      // console.log(this.props.currentLocal);
    this.setState({allUsersComparisonData: this.props.allUsers.map(u => ({id: u.id}))})
    this.setCurrentUserTopAbsArtists(),
    this.setCurrentUserTopTracks().then(()=> {
      return this.userCompatibility()

    })


// ***** ***** ***** ***** *****
      // this.testRoute();
// ***** ***** ***** ***** *****
    }
  }

  componentDidMount() {

  }


  testRoute() {
    $.get('http://localhost:3000/users/getUserTopTrackArtists/'+this.props.currentLocal.id)
    .done( topTrackArtists => {
      console.log(topTrackArtists);
    })
    .fail( err => {
      console.error(err);
    })
  }

  // CURRENT USER
  setCurrentUserTopTracks = () => {
    return $.get('http://localhost:3000/users/getUserTopTracks/'+this.props.currentLocal.id)
    .done( topTrackIDs => {
      for (let i = 0; i < topTrackIDs.length; i++) {
        $.get('http://localhost:3000/tracks/getTrackByID/'+topTrackIDs[i].id)
        .done( result => {
          let currentUserTopTracks = this.state.topTracks;
          currentUserTopTracks.push(result);
          this.setState({ topTracks: currentUserTopTracks });
          this.setState({userAudioTrackFeatures: this.getUserTrackAudioFeatures(this.state.topTracks)})
        })
        .fail( err => {
          console.error(err);
        })
      }
    })
    .fail( err => {
      console.error(err);
    });
  }

  setCurrentUserTopAbsArtists = () => {
    return $.get('http://localhost:3000/users/getUserTopAbsArtists/' + this.props.currentLocal.id)
    .done(absArtistIDs => {
      // console.log(absArtistIDs)
      for(let i = 0; i < absArtistIDs.length; i++) {
        $.get('http://localhost:3000/absArtists/getAbsArtistByID/' + absArtistIDs[i].id)
        .done(artist => {
          let topArtists = this.state.topArtists
          topArtists.push(artist)
          this.setState({topArtists})
        })
        .fail(err => {
          console.error(err)
        })
      }
    })
    .fail(err => {
      console.error(err)
    })
  }


  //ALL OTHER USERS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getUserTopTracks(id){
      $.get('http://localhost:3000/users/getUserTopFullTracks/'+ id)
      .done( topTracks => {
        console.log(topTracks)
        console.log(this.getUserTrackAudioFeatures(topTracksArray))
      })
  }

  getUserTopAbsArtists(id) {
    return $.get('http://localhost:3000/users/getUserTopAbsArtists/' + id)
    .done(absArtistIDs => {
      // console.log(absArtistIDs)
      for(let i = 0; i < absArtistIDs.length; i++) {
        $.get('http://localhost:3000/absArtists/getAbsArtistByID/' + absArtistIDs[i].id)
        .done(artist => {
          let allUsersTopArtists = this.state.allUsersTopArtists
          allUsersTopArtists.push(artist)
          this.setState({allUsersTopArtists})
        })
        .fail(err => {
          console.error(err)
        })
      }
    })
    .fail(err => {
      console.error(err)
    })
  }



  getChartData(){
    let chart = Prettiness(SampleData(), Palette().cool_10);
    this.setState({ chartData: chart.data });
  }

  handleClickElement = (event) => {
    if (event[0]) {
      let index = event[0]['_index'];
      let label = this.state.chartData.labels[index];
      let insightData = `INDEX: ${index} => ${label}`;
      // alert(`INDEX: ${index} => ${label}`);

      this.setState({ insightData: insightData });
    }
  }

  render (){
    let user_img = '#'
    let user_name = null;

    if(!this.props.currentLocal) {
      // console.log('Please wait.');
    } else {
      user_img = this.props.currentLocal.image_urls.image;
      user_name = this.props.currentLocal.display_name
    }

    return(
      <div>

        <UserProfile
        user_img = {user_img}
        user_name = {user_name}
        />

        <div className='row'>
          <div className='col-md-3'>
          </div>

          <div className='col-md-6 top-matches-text'>
            <h1 style={{color: 'white'}}>Your Top Musical Matches</h1>
          </div>

          <div className='col-md-3'>
          </div>
        </div>

          <UserMatchSidebar />

        <div className='row'>
          <div className='col-md-6'>
            <BarChart
              chartData={this.state.chartData}

              title="Left Chart"
              y_label="Y-AXIS"
              x_label="X-AXIS"

              handleClick={ event => this.handleClickElement(event) }
            />
          </div>

          <div className='col-md-6'>
            <TopArtistInsight insightData={this.state.insightData}/>
          </div>
        </div>

        <UserBoxAnalytics userAudioTrackFeatures={this.state.userAudioTrackFeatures} />

      </div>
      )
  }
}

export default CurrentUser;