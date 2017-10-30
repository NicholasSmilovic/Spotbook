var request = require('request');

let playlists = require('./starterDB.js')

const getSecurePlaylist = (name) =>{
  let obj = playlists[name]
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
    // arrayOfPlaylists.push(obj)
    arrayOfPlaylists.push(playlists[playlist])
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
      users:[],
      currentlyPlaying: {
        id: "",
        name: "",
        duration_ms: "",
        progress_ms: "",
        skip: {}
      }
    }
    nextTrack(playlist.name, accessToken, callback)
    callback()
  })
}

const currentTrack = (accessToken, callback) => {
  let options = {
    url: `https://api.spotify.com/v1/me/player/currently-playing`,
    method: "GET",
    json: true,
    headers: {
      Authorization: "Bearer " + accessToken
    }
  }

  request(options,(error, response, body) => {
    if (error) {
      callback("bad request to spotify")
      return
    }
    if(body && body.item) {
      callback(body.item.id, body.item.name, body.progress_ms, body.item.duration_ms)
    } else {
      currentTrack(accessToken, callback)
    }
  })
}

const isNewTrack = (playlistName, retrievedId) => {
  return !(playlists[playlistName].currentlyPlaying.id === retrievedId)
}

const nextTrack = (playlistName, accessToken, callback) => {
  currentTrack(accessToken, (id, name, progress_ms, duration_ms) => {
    if(isNewTrack(playlistName, id)) {
      playlists[playlistName].currentlyPlaying.skip = {}
      console.log(id, name, progress_ms, duration_ms)
      playlists[playlistName].currentlyPlaying = {
        id: id,
        name: name,
        duration_ms: duration_ms,
        progress_ms: progress_ms,
        skip: {}
      }
      callback(null, playlistName, playlists[playlistName].currentlyPlaying)
    }
    nextTrack(playlistName, accessToken, callback)
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


const updateRoomPopulations = (sockets) => {
  for(let socket in sockets) {
    let playlistName = sockets[socket].playlist
    console.log("inside update server function")
    console.log(sockets[socket].id)
    console.log(sockets[socket].playlist)
    if (playlists[playlistName]) {
      playlists[playlistName].users.push(socket)
    }
  }
}

const updateRoomData = (sockets, callback) => {
  for(playlist in playlists){
    playlists[playlist].users = []
  }
  updateRoomPopulations(sockets)
  callback()
}


module.exports = {
  getAllPlaylists: getAllPlaylists,
  addNewPlaylist: addNewPlaylist,
  verify: verify,
  getSecurePlaylist: getSecurePlaylist,
  addSongToPlaylist: addSongToPlaylist,
  updateRoomData: updateRoomData
}
