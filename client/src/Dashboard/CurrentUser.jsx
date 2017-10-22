import React, {Component} from 'react';
import PieChart from '../Charts/Pie.jsx';
import BarChart from '../Charts/Bar.jsx';

class CurrentUser extends Component {

  constructor(){
    super();
    this.state = {
      chartData:{}
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
          label:'Points',
          data:[50,30,70,100,110,20],
          backgroundColor:[
            '#59F64B',
            '#6200EA',
            '#0CE486',
            '#4E9CF5',
            '#B2FF59',
            '#9CF1E0',
          ],
        }]
      }
    });
  }

  handleClickElement = (event) => {
    if (event[0]) {
      let index = event[0]['_index'];
      let label = this.state.chartData.labels[index];

      console.log(`INDEX: ${index} => ${label}`);
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

        <PieChart
        chartData={this.state.chartData}
        text="Pie Chart in "
        location="Spotcheck"
        handleClick={ event => this.handleClickElement(event) }/>

        </div>
      )
  }
}

export default CurrentUser;