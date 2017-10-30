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
    let introText = '';

    if(!this.props.insightData) {
      renderInsights = 'Click a bar in the chart for some juicy deets.';
    } else {

      introText = 'Your top tracks from...';
      artistName = this.props.insightData.artist.artist_name;
      artistImage = <img src={this.props.insightData.artist.image_urls.medium} />
      renderInsights = this.props.insightData.tracks.map( track =>
        <h4 key={Math.random()}>{track.track_name}</h4>
        );
    }

    return (
      <div className='insight-window'>
        <div className='insight'>
          <div className='row'>
            {artistImage}
            <h4 className='intro-text'>{introText}</h4>
            <h1>{artistName}</h1>
          </div>
          <div className='row'>
            <h3>{renderInsights}</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default TopArtistInsight;