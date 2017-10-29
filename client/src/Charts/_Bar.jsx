import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

import Prettiness from '../Charts/Prettiness.jsx'
import Palette from '../Charts/Palette.jsx'

class BarChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: this.props.chartData,

      chartDataSample: {
        labels: [
        'Carlo',
        'Nich',
        'Brandon',
        'Bryce',
        'Dummy_1',
        ],
        datasets:[{
          label:'Stuff',
          data:[50,80,70,100,110],
        }]
      }

    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      this.setState({chartData: nextProps.chartData});
    }
  }

  componentWillMount() {
    // console.log('willMount:')
    // console.log($.isArray(this.state.chartData.labels))
    // console.log(this.state.chartDataSample)
    // console.log(this.state.chartData.datasets)
    // console.log(this.state.chartData.labels)

    if(!this.props.chartData) {
      // console.log('componentWillMount: Please wait.')
    } else {
      // console.log(this.props.chartData.labels.length)
      // console.log(this.props.chartData.labels.length)
    // console.log(this.state.chartData.labels.length)
      // this.printForNoReason(this.props.chartData)
    }

  }

  componentDidMount() {
    this.handleChartData();

    // console.log(this.props.chartData.labels.length)
    // console.log(this.state.chartDataSample)
    // console.log(this.state.chartData);
  }

  printForNoReason(stuff) {
    console.log(stuff);
  }

  handleChartData(){
    let chart = Prettiness(this.state.chartData, Palette().cool_10);
    this.setState({ chartData: chart.data });

    // let chartSample = Prettiness(this.state.chartDataSample, Palette().cool_10);
    // this.setState({ chartDataSample: chartSample.data });

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

    // console.log(this.props.chartData)

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
                  fontColor: fontColor
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
// export default BarHandler;
// export default {BarChart, BarHandler};