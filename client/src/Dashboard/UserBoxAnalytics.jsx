import React, {Component} from 'react';

class UserBoxAnalytics extends Component{
  render (){
    return(
      <div className='row'>
        <div className='col-md-4 analytic key'>
          <h4>Your favourite key is:</h4>
          <h2>Bb Maj</h2>
        </div>
        <div className='col-md-4 analytic tempo'>
          <h4>Your average tempo is:</h4>
          <h2>112 BPM</h2>
        </div>
        <div className='col-md-4 analytic dB'>
          <h4>Your average volume is:</h4>
          <h2>-8.3dB</h2>
        </div>
      </div>
      )
  }
}

export default UserBoxAnalytics;