import React, {Component} from 'react';

import UserMatchSidebar from './UserMatchSidebar.jsx';
import UserProfile from './UserProfile.jsx';
import Navbar from '../partials/Navbar.jsx'

import Prettiness from '../Charts/Prettiness.jsx'
import SampleData from '../Charts/SampleChartData.jsx'
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

  componentDidMount(){
    this.makeChartPretty();
  }

  getChartData(){
    // Ajax calls here
    this.setState({ chartData:SampleData() });
  }

  makeChartPretty(){
    // Make copy of state, change copy of state, then make state the edited version of itself.
    let prettyData = Prettiness( this.state.chartData, Palette().cool_10 );
    this.setState({ chartData: prettyData });
  }


  handleClickElement = (event) => {
    if (event[0]) {
      let index = event[0]['_index'];
      let label = this.state.chartData.data.labels[index];

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
            y_label=""
            x_label=""

            handleClick={ event => this.handleClickElement(event) }
          />
        </div>
      )
  }
}

export default CurrentUser;