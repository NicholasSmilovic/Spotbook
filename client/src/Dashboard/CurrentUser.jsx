import React, {Component} from 'react';

import UserMatchSidebar from './UserMatchSidebar.jsx';
import UserProfile from './UserProfile.jsx';
import UserBoxAnalytics from './UserBoxAnalytics.jsx';

import SampleData from '../Charts/SampleChartData.jsx'

import Prettiness from '../Charts/Prettiness.jsx'
import Palette from '../Charts/Palette.jsx'
import BarChart from '../Charts/_Bar.jsx'


class CurrentUser extends Component {

  // *** Charts Requires Stuff Below
  constructor(props){
    super(props);
    this.state = {
      chartData:{},
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    // $.get('http://localhost:3000/users/getUserByID/1') // TODO - get currentUser spotifyID into scope of this component
    $.get('http://localhost:3000/users/getUserBySpotifyID')
    .done( result => {
      console.log(result);
    })
    .fail( err => {
      console.error(err);
    });

    console.log(`This be the current user's Spotify ID: ${this.props.currentUser}`);
    let chart = Prettiness(SampleData(), Palette().cool_10);
    this.setState({ chartData: chart.data });
  }

  handleClickElement = (event) => {
    if (event[0]) {
      let index = event[0]['_index'];
      let label = this.state.chartData.labels[index];

      alert(`INDEX: ${index} => ${label}`);
    }
  }
  // *** Charts Requires Stuff Above

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

        <div>

          <UserProfile />
          <UserMatchSidebar />

          <BarChart
            chartData={this.state.chartData}

            title="Spotcheck"
            y_label="Y-AXIS"
            x_label="X-AXIS"

            handleClick={ event => this.handleClickElement(event) }
          />
        </div>

        <UserBoxAnalytics />

      </div>
      )
  }
}

export default CurrentUser;