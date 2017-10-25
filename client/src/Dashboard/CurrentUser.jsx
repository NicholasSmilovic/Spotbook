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
      currentUser:{},
      insightData:'Stuff'
    }
  }


  // componentDidMount() {
  //   let { access_token } = parse(location.search)

  //   if (access_token) localStorage.access_token = access_token

  // }

  componentWillMount(){
    this.setCurrentUser();
    this.getChartData();
    // this.testRoute();
  }

  // can reach getUserTopTracks error message
  // can reach getUserTopAbsArtists error message

  testRoute(){
    $.get('http://localhost:3000/users/getUserTopTrackArtists/'+this.state.currentUser.id)
    .done( result => {
      console.log('INSIDE TEST ROUTE')
      console.log(result)
    })
    .fail( err => {
      console.error(err);
    });
  }

  // this route could be executed upon logging into spotify
  setCurrentUser(){
    $.get('http://localhost:3000/users/getUserBySpotifyID/'+this.props.currentSpotifyID)
    .done( result => {
      console.log(result);
      this.setState({ currentUser: result });
      this.testRoute();
    })
    .fail( err => {
      console.error(err);
    });
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
    return(
      <div>

        <UserProfile />

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