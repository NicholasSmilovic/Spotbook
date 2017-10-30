import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class TopArtistInsight extends Component{
  constructor(props){
    super(props);
    // this.state = {}
  }

  render(){

    let renderInsights = '';
    let artistName = '';
    let artistImage ='';

    if(!this.props.insightData) {
      renderInsights = 'Click on a bar for juicy deets.';
    } else {
      artistImage = this.props.insightData.artist.image_urls.small;
      artistName = this.props.insightData.artist.artist_name;
      renderInsights = this.props.insightData.tracks.map( track =>
        <h4>{track.track_name}</h4>
        );
    }

    return (
      <div className='insight'>
        <div className='row'>
          <img src={artistImage} />
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