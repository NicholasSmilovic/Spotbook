import React, {Component} from 'react';
import TrackQuery from './TrackQuery.jsx'


class StickySideBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  handleQueryChange = (event) =>{
    this.setState({query:event.target.value})
  }

  render () {

    let queryResults = null
    if (this.state.query) {
      queryResults = <TrackQuery query={this.state.query} accessToken={this.props.accessToken}/>
    } else {
      queryResults = <div>Search for a Track </div>
    }


    return(
          <div className="sticky-container">
            <div className="sticky-block panel panel-default">
              <input  type="text" className="search-bar-query"
                      onChange = {this.handleQueryChange}
                      onKeyPress = {this.handleQueryKeypress}
                      value = {this.state.query} />
            </div>

            {queryResults}
          </div>
      )
  }
}

export default StickySideBar;
