import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      topTracks: this.props.topTracks,
      topArtists: [],
      // chartData:props.chartData
      chartData: {
        labels: [],
        datasets: [{
          label: 'Track Count',
          data: []
        }]
      }
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  // }


  componentWillMount() {
    console.log(this.state.topTracks)
    console.log(this.state.topTracks.length)
    console.log(typeof(this.state.topTracks))

    this.getArtistsFromTrackIDs();
    // console.log(this.props.topTracks)
    // if(!this.props.topTracks) {
      // console.log(this.props.topTracks, this.props.topTracks[0]);
      // console.log(typeof(this.props.topTracks));
      // console.log(this.props.topTracks.length);
      // console.log(Object.keys(this.props.topTracks))
      // console.log(this.props.topTracks.anonymous)
    //   console.log('Please wait.');
    // } else {
    //     console.log(this.props.topTracks);
    //     console.log(this.props.topTracks.toLowerCase())
        // this.props.topTracks.map( bullshit => {
        //   console.log(bullshit);
        // });

        // this.getArtistsFromTrackIDs();
    // }
    // return console.log(this.props.topTracks.length)
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

  getArtistsFromTrackIDs() {
    let artistIDs = [];

    for (let i = 0; i < this.state.topTracks.length; i++) {
      $.get('http://localhost:3000/tracks/getArtistFromTrackID/'+this.props.topTracks[i].id)
      .done( artist => {
        console.log(artist);
      })
      .fail (err => {
        console.error(err);
      })
    }
  }

  // get all top tracks artists
  // getUserTopTrackArtists() {
  //   $.get('http://localhost:3000/users/getUserTopTrackArtists/'+this.props.currentLocal.id)
  //   .done( artists => {
  //     // for(let i = 0; i < artists.length; i++) {
  //     //   $.get('http://localhost:3000/users/get')
  //     // }
  //     console.log(artists);
  //   })
  //   .fail( err => {
  //     console.error(err);
  //   })

  // }
  // determine top 5 artists with most tracks

  // get all tracks of these artists
  // $.get()



  render(){

    let fontColor = '#EEE';

    return (
      <div className="chart">

        <Bar
          data={this.state.chartData}
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