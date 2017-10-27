var request = require('request');

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
  let arrayOfPlaylists = []
  for(let playlist in playlists){
    let obj = {
      name:playlist,
      spotifyObject:playlists[playlist].spotifyObject
    }
    arrayOfPlaylists.push(obj)
  }
  return arrayOfPlaylists
}

const addNewPlaylist = (playlist, accessToken, currentUser, callback) =>{
  if(playlists[playlist.name]){
    callback("Name Taken")
    return
  }
  let options = {
    url: `https://api.spotify.com/v1/users/${currentUser}/playlists`,
    method: "POST",
    json: true,
    headers: {
      Authorization: "Bearer " + accessToken
    },
    form: JSON.stringify({
      "description": "New Active Playlist from Spotbook",
      "public": true,
      "name": playlist.name
    })
  }
  request(options,(error, response, body) => {
    if (error) {
      callback("bad request to spotify")
      return
    }
    playlists[playlist.name] = {
      name: playlist.name,
      password: playlist.password,
      spotifyObject: body
    }
    callback(null)
  })
}

const verify = (playlist, callback) => {
  if(playlists[playlist.name].password === playlist.password){
    callback(null)
    return
  }
  callback("invalid password")
}

module.exports = {
  getAllPlaylists: getAllPlaylists,
  addNewPlaylist: addNewPlaylist
}
