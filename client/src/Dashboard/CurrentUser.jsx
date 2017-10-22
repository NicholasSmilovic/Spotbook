import React, {Component} from 'react';
// import PieChart from '../Charts/Pie.jsx';
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
        labels: ['Toronto', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[{
          label:'Population',
          data:[617594, 181045, 153060, 106519, 105162, 95072],
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
        }]
      }
    });
  }


  render (){
    return(
        <div id="user-profile">

        <BarChart
        chartData={this.state.chartData}
        text="Bar Chart in "
        location="Lighthouse Labs"/>

        </div>
      )
  }
}

export default CurrentUser;