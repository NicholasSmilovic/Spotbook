import React, {Component} from 'react';
import Song from './Song.jsx';


class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    }
  }

  componentDidMount() {
    let accessToken = this.props.accessToken
      fetch (this.props.playlist.tracks.href, {
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
        this.setState({ songs: data.items})
      })

  }

  render() {
    let renderSongs = this.state.songs.map((song, index)=>{
        return <Song song = {song} key = {index}/>
      })

    return (
      <div>
        <hr/>
        <table className="table table-bordered">
            <thead><tr>
              <th className="col-xs-1">Album Art</th>
              <th className="col-xs-4">Track Name</th>
              <th className="col-xs-4">Track Artist</th>
              <th className="col-xs-3">Track Album</th>
            </tr></thead>
            <tbody>
              {renderSongs}
            </tbody>
          </table>
        </div>
      )
  }
}


export default Songs