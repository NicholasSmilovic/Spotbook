import React, {Component} from 'react';

import UserMatchSidebar from './UserMatchSidebar.jsx';
import UserProfile from './UserProfile.jsx';
import Navbar from '../partials/Navbar.jsx'

import SampleData from '../Charts/SampleChartData.jsx'

import Prettiness from '../Charts/Prettiness.jsx'
import Palette from '../Charts/Palette.jsx'
import BarChart from '../Charts/_Bar.jsx'


class CurrentUser extends Component {

  // *** Charts Requires Stuff Below
  constructor(){
    super();
    this.state = {
      chartData:{},
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    // Ajax calls here
    $.get('http://localhost:3001/')
    .done(result => {

      // this.setState({ tracks: result });
      console.log(result);
    } )
    .fail( err => {
      console.log(err);
    })

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
          <UserMatchSidebar />

          <BarChart
            chartData={this.state.chartData}

            title="Spotcheck"
            y_label="Y-AXIS"
            x_label="X-AXIS"

            handleClick={ event => this.handleClickElement(event) }
          />
        </div>
      )
  }
}

export default CurrentUser;