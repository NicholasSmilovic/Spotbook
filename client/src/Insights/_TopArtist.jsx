import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class TopArtistInsight extends Component{
  constructor(props){
    super(props);
    // this.state = {}
  }

  render(){

    let renderInsights = '';
    let artistName = ''

    if(!this.props.insightData) {
      renderInsights = 'Click on a bar for juicy deets.';
    } else {
      artistName = this.props.insightData.artist.artist_name;
      renderInsights = this.props.insightData.tracks[0].track_name;
    }

    return (
      <div className='insight'>
        <div className='row'>
          <h1>{artistName}</h1>
        </div>
        <div className='row'>
          <h3>{renderInsights}</h3>
        </div>
      </div>
    )
  }
}

export default TopArtistInsight;