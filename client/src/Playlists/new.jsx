import React, {Component} from 'react';
import Newer from './Newer.jsx';



class New extends Component{
  render (){

    const renderPlaylistTracks = this.props.tracks.map((track) =>{
      return <Newer tracks={track} />
    });

    return(
      <div>
        <h1>Hello form New </h1>
        {this.props.tracks}
        {renderPlaylistTracks}
      </div>
    )
}
}

export default New;
