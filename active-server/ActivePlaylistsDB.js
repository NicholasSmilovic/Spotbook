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
  },
  "asd":{
    password: "password1",
    tracks: [
    {
      spotifyURI: "asd"
    },
    {
      spotifyURI: "asd"
    }]
  },
  "asd":{
    password: "password1",
    tracks: [
    {
      spotifyURI: "asd"
    },
    {
      spotifyURI: "asd"
    }]
  },
  "s;sdjflksd":{
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

const getSecurePlaylist = (name) =>{
  let obj = {
      name: name,
      spotifyObject:playlists[name].spotifyObject,
      password: playlists[name].password
    }
  return obj
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
  if(!(playlist.name)) {
    callback("Provide Title")
    return
  }
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
      spotifyObject: body,
      accessToken
    }
    callback()
  })
}

const escapeColons = (string) => {
  return string.split(":").join("%3A")
}

const addSongToPlaylist =  (playlist, track, callback) => {
  console.log(playlist, track)
  trackURI = escapeColons(track.trackURI)
  playlistOwner = playlist.owner.id
  accessToken = playlists[playlist.name].accessToken

  let options = {
    url: `https://api.spotify.com/v1/users/${playlistOwner}/
            playlists/tracks?uris=${trackURI}`,
    method: "POST",
    json: true,
    headers: {
      Authorization: "Bearer " + accessToken
    }
  }
  request(options,(error, response, body) => {
    if (error) {
      callback(null, "bad request to spotify")
      return
    }
    callback(playlist.name)
  })


}

const verify = (playlist, callback) => {
  console.log(playlists[playlist.name].password === playlist.password)
  if(playlists[playlist.name].password === playlist.password){
    let response = playlists[playlist.name]
    response.name = playlist.name
    callback(response, null)
    return
  }
  callback(null, "invalid credentials")
}

module.exports = {
  getAllPlaylists: getAllPlaylists,
  addNewPlaylist: addNewPlaylist,
  verify: verify,
  getSecurePlaylist: getSecurePlaylist,
  addSongToPlaylist: addSongToPlaylist
}
