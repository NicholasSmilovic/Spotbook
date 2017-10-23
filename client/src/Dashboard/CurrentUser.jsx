import React, {Component} from 'react';

import UserMatchSidebar from './UserMatchSidebar.jsx';
import UserProfile from './UserProfile.jsx';
import Navbar from '../partials/Navbar.jsx'

import SampleData from '../Charts/SampleChartData.jsx'
import Palette from '../Charts/Palette.jsx'
import BarChart from '../Charts/Bar.jsx'


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
    let data = this.state.chartData;
    data.datasets[0]["backgroundColor"] = Palette().cool_10;
    this.setState({ chartData:data });
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
    // <UserProfile />
    // <UserMatchSidebar />
    return(

        <div>


          <BarChart
          chartData={this.state.chartData}
          text="Bar Chart in "
          location="Spotcheck"
          handleClick={ event => this.handleClickElement(event) }/>
        </div>
      )
  }
}

export default CurrentUser;