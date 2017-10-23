import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  render(){
    return (
      <div className="chart">

        <Bar
          data={this.state.chartData}
          getElementAtEvent = {this.props.handleClick}
          options={{
            title:{
              display: true,
              text:this.props.title,
              fontSize:25
            },

            legend:{ display: false },

            scales: {
              yAxes: [{
                gridLines:{
                  display: false,
                  drawBorder: false
                },
                scaleLabel: {
                  display: true,
                  labelString: this.props.y_label
                },
                ticks: {
                  display: false,
                  beginAtZero: true
                }
              }],
              xAxes: [{
                gridLines:{
                  display: false,
                  drawBorder: true,
                  color: '#FFF'
                   },
                scaleLabel: {
                  display: true,
                  labelString: this.props.x_label
                }
              }]
            },
          }}
        />


      </div>
    )
  }
}

export default BarChart;