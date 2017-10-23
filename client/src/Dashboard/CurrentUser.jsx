import React, {Component} from 'react';
// import PieChart from '../Charts/Pie.jsx';
import BarChart from '../Charts/Bar.jsx';
import Palette from '../Charts/Palette.jsx'

class CurrentUser extends Component {

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

  render (){

    return(
        <div id="user-profile">

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