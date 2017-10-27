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



class CurrentUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartData:{},
      topTracks:[],
      topArtists:[],
      insightData:'Stuff',
      compatibleUsers: []
    }
  }




  componentWillMount(){
    this.getChartData();
    if (!this.props.currentLocal) {
      // console.log('Please stand by while we get that thing that you need.')
    } else {
      // console.log("We got it. The thing that you need immediately follows this sentence.")
      // console.log(this.props.currentLocal);
      this.getUserTopAbsArtists()
      this.getUserTopTracks();
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

  // Grab user's top tracks
  getUserTopTracks(){
    $.get('http://localhost:3000/users/getUserTopTracks/'+this.props.currentLocal.id)
    .done( topTrackIDs => {
      for (let i = 0; i < topTrackIDs.length; i++) {
        $.get('http://localhost:3000/tracks/getTrackByID/'+topTrackIDs[i].id)
        .done( result => {
          let topTracks = this.state.topTracks;
          topTracks.push(result);
          this.setState({ topTracks: topTracks });
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

  getUserTopAbsArtists() {
    $.get('http://localhost:3000/users/getUserTopAbsArtists/' + this.props.currentLocal.id)
    .done(result => {
      console.log(result)
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

        <UserBoxAnalytics />

      </div>
      )
  }
}

export default CurrentUser;