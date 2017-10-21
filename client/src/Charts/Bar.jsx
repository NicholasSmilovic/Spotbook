import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    return (
      <div className="chart">


        <Bar
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:this.props.text+this.props.location,
              fontSize:25
            },
            legend:{
              display:false,
              position:this.props.legendPosition
            },
            scaleLabel: {
              labelString: 'THIS IS THE Y-AXIS'
            },
            scales: {
              yAxes: [{
                  ticks: {
                    callback: function(label, index, labels) {
                      return '$' + label;
                    }
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