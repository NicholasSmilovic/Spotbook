import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class TopArtistInsight extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){

    return (
      <div className="insight">
          {this.props.insightData}
      </div>
    )
  }
}

export default TopArtistInsight;