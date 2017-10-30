import React, {Component} from 'react';
import { Line, Circle } from 'rc-progress';

class Player extends Component{
            // <Line percent="10" strokeWidth="4" strokeColor="#D3D3D3" />

  preventDefault = (event) =>{
  }

  handleVoteToSkip = (event) => {
    event.preventDefault()
    this.props.voteToSkipSong()
  }

  render (){
    let skipPercent = 0;
    if( this.props.currentlyPlaying.skip && this.props.users) {
      skipPercent = Object.keys(this.props.currentlyPlaying.skip).length/this.props.users.length * 100

    }

    return(
        <div className="row">
            <div className="col-sm-4">
              <img className="img-responsive" src={this.props.currentlyPlaying.albumArt} />
            </div>
          <div className="col-sm-4">
            <h1> Currently Playing: {this.props.currentlyPlaying.name} </h1>
            </div>
            <div className="col-sm-4">
              <div className="">
                <a href="#" onClick={this.handleVoteToSkip} className='over-skip-circle box'>
                  <h3> Vote to Skip </h3>
                  <Circle className="skip-cirle box" percent={skipPercent} strokeWidth="4" strokeColor="red" />
                </a>
              </div>
            </div>
          </div>
    )
  }
}

export default Player;