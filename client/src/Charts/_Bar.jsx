import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

import Prettiness from '../Charts/Prettiness.jsx'
import Palette from '../Charts/Palette.jsx'

class BarChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: this.props.chartData,
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      this.setState({chartData: nextProps.chartData});
      this.handleChartData();
    }
  }

  componentDidMount() {
    this.handleChartData();

  }

  handleChartData(){
    let chart = Prettiness(this.state.chartData, Palette().cool_10);
    this.setState({ chartData: chart.data });
  }

  /*
  1. GET ALL TOP TRACK IDS
  2. GET ALL ARTIST IDS ASSOCIATED WITH TRACK IDS
  3. CREATE OBJECT OF KEYS ASSOCIATED WITH ARRAY VALUES
    - EACH ARTIST ID IS A KEY VALUE, AND THE KEY IS ASSOCIATED WITH AN ARRAY CONTAINING ALL TRACK IDS
  4. DETERMINE TOP 5 ARTIST IDS WITH LENGTHIEST ARRAY
  5. GET INFO OF TOP 5 ARTISTS AND STORE IN STATE
  6. GET INFO OF TRACKS IN ARRAYS ASSOCIATED WITH TOP 5 ARTISTS AND STORE IN STATE
  */





  render(){

    let fontColor = '#EEE';

    return (
      <div className="chart">

        <Bar
          data={this.props.chartData}
          getElementAtEvent = {this.props.handleClick}
          options={{
            title:{
              display: true,
              text:this.props.title,
              fontSize: 25,
            },

            legend:{ display: false },

            scales: {

              pointLabels: {
                fontSize: 20,
              },

              yAxes: [{
                gridLines:{
                  display: false,
                  drawBorder: false
                },
                scaleLabel: {
                  display: true,
                  labelString: this.props.y_label,
                  fontColor: fontColor
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
                  labelString: this.props.x_label,
                  fontColor: fontColor
                },
                ticks: {
                  fontColor: fontColor,
                  fontSize: 14
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
