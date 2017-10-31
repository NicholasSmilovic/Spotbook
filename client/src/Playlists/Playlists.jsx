import React, {Component} from 'react';
import Playlist from './Playlist.jsx';
import StickySideBar from './StickySideBar.jsx'


class Playlists extends Component{

  constructor(props) {
    super(props);
    this.state = {
      playlists:[],
      loading: true,
      total: 0,
      totalLoaded: 0
    }

  }

  componentWillMount() {
    this.fetchAllPlaylists()
  }

  fetchAllPlaylists() {
    this.fetchLength((length) =>{
      let numberOfFetches = Math.ceil(length / 20);
      for(let fetchCount = 0; fetchCount < numberOfFetches; fetchCount++){
        this.fetchPlaylists( fetchCount * 20, (data) => {
          let newPlaylists = this.state.playlists.concat(data.items)
          this.setState({ playlists: newPlaylists })
          if(fetchCount === (numberOfFetches - 1)){
            this.setState({ loading: false })
          }
        })
      }
    })
  }

  fetchLength(callback) {
    this.fetchPlaylists(0, (data) => {
      callback(data.total)
    })
  }

  fetchPlaylists(offset, callback) {

    fetch ("https://api.spotify.com/v1/users/" + this.props.currentUser + "/playlists?offset=" + offset, {
        headers: {
          Authorization: "Bearer " + this.props.accessToken
        }
      })
      .then((response) => {
        if(response.status >= 400){

        }
        return response.json()
      })
      .then((data) => {
        callback(data)
      })
  }


  render (){
    let renderPlaylists = <div>Loading...</div>
    if(!(this.state.loading)) {
      renderPlaylists = this.state.playlists.map((playlist, index)=>{
        return <Playlist  currentUser = {this.props.currentUser}
                          playlist={playlist}
                          accessToken={this.props.accessToken}
                          key={index}/>
      })
    }


    return(
      <div>
      <div className='row'>
        <div className='col-md-5'>
        </div>
        <div className='col-md-2 playlist-page-header'>
          <h1>Playlists</h1>
        </div>
        <div className='col-md-5'>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 col-xs-6 text-center sticky-block">
          <StickySideBar accessToken={this.props.accessToken}/>
        </div>
        <div className="col-md-10 col-xs-6 sticky-container">{renderPlaylists}</div>
      </div>
      </div>
    )
}
}

export default Playlists;
