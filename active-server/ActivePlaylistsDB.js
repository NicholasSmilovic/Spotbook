var request = require('request');

let playlists = require('./starterDB.js')

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
      spotifyObject:playlists[playlist].spotifyObject,
      users:playlists[playlist].users
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
      accessToken: accessToken,
      users:[]
    }
    callback()
  })
}

const escapeColons = (string) => {
  return string.split(":").join("%3A")
}

const addSongToPlaylist =  (playlist, track, callback) => {
  trackURI = escapeColons(track.trackURI)
  playlistOwner = playlist.owner.id
  playlistId = playlist.id
  accessToken = playlists[playlist.name].accessToken

  let options = {
    url: `https://api.spotify.com/v1/users/${playlistOwner}/playlists/${playlist.id}/tracks?uris=${trackURI}`,
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

const updateRoomPopulations = (sockets, callback) => {
  for(playlist in playlists){
    playlists[playlist].users = []
  }
  for(let socket in sockets) {
    let playlistName = sockets[socket].playlist
    console.log("inside update server function")
    console.log(sockets[socket].id)
    console.log(sockets[socket].playlist)
    if (playlists[playlistName]) {
      playlists[playlistName].users.push(socket)
    }
  }
  callback()
}

module.exports = {
  getAllPlaylists: getAllPlaylists,
  addNewPlaylist: addNewPlaylist,
  verify: verify,
  getSecurePlaylist: getSecurePlaylist,
  addSongToPlaylist: addSongToPlaylist,
  updateRoomPopulations: updateRoomPopulations
}
