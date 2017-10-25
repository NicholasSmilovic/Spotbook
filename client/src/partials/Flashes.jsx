import React, {Component} from 'react';

class Flashes extends Component{

  componentDidMount() {
    setTimeout(this.props.removeFlashState, 5000);
  }

  render () {
    const message = this.props.content;

    return(
      <div className="flash-message">
        {message}
      </div>
      )
  }

}

export default Flashes;
