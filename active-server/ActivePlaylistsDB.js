module.exports = () => {
  let playlists ={
    "activeplaylists1":{
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

  return {
    getAllPlaylists: getAllPlaylists
  }
}