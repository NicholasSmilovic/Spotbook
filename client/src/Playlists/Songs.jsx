import React, {Component} from 'react';
import Song from './Song.jsx';


class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    }
  }

  getSong = () => {
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
      this.props.rerendered()
    })
  }

  componentDidMount() {
    this.getSong()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.update) {
      this.getSong()
    }
  }

  render() {
    let renderSongs = this.state.songs.slice(0).reverse().map((song, index)=>{
        return <Song song = {song} key = {index}/>
      })

    return (
      <div>
        <hr/>
        <table className="table bordered-row auto-size">
            <thead><tr>
              <th className="col-sm-1 col-xs-6 text-center">Album Art</th>
              <th className="col-sm-4 col-xs-6 text-center">Track Name</th>
              <th className="col-sm-4 hidden-xs text-center">Track Artist</th>
              <th className="col-sm-3 hidden-xs text-center">Track Album</th>
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