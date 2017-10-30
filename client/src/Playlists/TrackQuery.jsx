import React, {Component} from 'react';
import RenderQuery from './RenderQuery.jsx';

class TrackQuery extends Component{
  constructor(props) {
    super(props);
    this.state = {
      queryResults: ""
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props.query === nextProps.query)
  }

  componentWillReceiveProps() {
    let accessToken = this.props.accessToken
    let query = this.props.query
    fetch ("https://api.spotify.com/v1/search?q=" + query + " &type=track", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
      .then((response) => {
        if(response.status >= 400){

        }
        return response.json()
      })

      .then((data) => {
        this.setState({ queryResults: data.tracks.items})
      })
  }



  render() {
    let renderSongs = null
    if(this.state.queryResults){
      let renderSongs = this.state.queryResults.map((track, index)=>{
        return <RenderQuery track = {track} key = {index}/>
      })
      return (
        <div>{renderSongs}</div>
        )
    }
    return(
      <div>Loading..</div>
      )
  }
}

export default TrackQuery;
