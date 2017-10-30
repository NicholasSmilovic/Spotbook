import React, {Component} from 'react';

class DataHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topTracks: [],
      topArtists: [],

    }
  }

  componentWillMount() {
    if(this.props.currentLocal) {
      this.getUserTopTrackArtists();
    }
  }

  // get all top tracks artists
  getUserTopTrackArtists() {
  // $.get('http://localhost:3000/getUserTopTrackArtists/'+this.props.currentLocal)
  $.get('http://localhost:3000/getUserTopTrackArtists/'+1)
  .done( artists => {
    console.log(artists);
    console.log('*** from TopArtistData.jsx ***');
  })
  .fail( err => {
    console.error(err);
  })

  }
  // determine top 5 artists with most tracks

  // get all tracks of these artists
  // $.get()

}

export default DataHandler;