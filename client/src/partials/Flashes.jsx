import React, {Component} from 'react';

class Flashes extends Component{

  // componentWillUnmount() {
  //   this.props.removeFlashState
  // }
  render () {
    setTimeout(this.props.removeFlashState, 5000);
    const message = this.props.content;
    const error = this.props.error;
    return(
      <div>
        <div className="flash-message-success">
          {message}
        </div>
        <div className="flash-message-error">
          {error}
        </div>
      </div>
      )
  }

}

export default Flashes;
