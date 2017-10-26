module.exports = () => {
  let playlists ={
    "activeplaylists1":{
      userSpotifyId: "nicholas_smilovic",
      password: "password1",
      tracks: [
      {
        spotifyURI: "asd"
      },
      {
        spotifyURI: "asd"
      }]
    },
    "activeplaylists2":{
      password: "password1",
      tracks: [
      {
        spotifyURI: "asd"
      },
      {
        spotifyURI: "asd"
      }]
    },
    "activeplaylists3":{
      password: "password1",
      tracks: [
      {
        spotifyURI: "asd"
      },
      {
        spotifyURI: "asd"
      }]
    }
  }

  const getAllPlaylists = () => {
    return Object.keys(playlists)
  }

  const addNewPlaylist = (playlist, callback) =>{
    if(!playlists[playlist.name]){
      playlists[playlist.name] = {
        name: playlist.name,
        password: playlist.password,
        tracks: []
      }
    }
    callback(null)
  }

  return {
    getAllPlaylists: getAllPlaylists,
    addNewPlaylist: addNewPlaylist
  }
}