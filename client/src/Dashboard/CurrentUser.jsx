import React, {Component} from 'react';
import UserMatchSidebar from './UserMatchSidebar.jsx';
import UserProfile from './UserProfile.jsx';
import Navbar from '../partials/Navbar.jsx'

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

  getChartData(){
    // Ajax calls here
    this.setState({
      chartData:{
        labels: ['Carlo', 'Nich', 'Brandon', 'Bryce', 'Dummy_1', 'Dummy_2'],
        datasets:[{
          label:'Stuff',
          data:[50,80,70,100,110,20],
          backgroundColor: Palette().warm,
        }]
      }
    });
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
          text="Bar Chart in "
          location="Spotcheck"
          handleClick={ event => this.handleClickElement(event) }/>
        </div>
      )
  }
}

export default CurrentUser;