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
      users:playlists[playlist].users,
      currentlyPlaying: playlists[playlist].currentlyPlaying,
      password: playlists[playlist].password
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

const currentTrack = (accessToken, playlistName, callback) => {
  let options = {
    url: `https://api.spotify.com/v1/me/player/currently-playing`,
    method: "GET",
    json: true,
    headers: {
      Authorization: "Bearer " + accessToken
    }
  }

  request(options,(error, response, body) => {
    if(response.statusCode == 401) {
      delete playlists[playlistName]
      callback("Playlist Expired")
      return
    }
    if (error) {
      callback("bad request to spotify")
      return
    }
    if(body && body.item) {
      let albumArt = body.item.album.images[0].url
      callback(body.item.id, body.item.name, albumArt, body.progress_ms, body.item.duration_ms)
    } else {
      currentTrack(accessToken, playlistName, callback)
    }
  })
}

const isNewTrack = (playlistName, retrievedId) => {
  return !(playlists[playlistName].currentlyPlaying.id === retrievedId)
}

const nextTrack = (playlistName, accessToken, callback) => {
  currentTrack(accessToken, playlistName, (id, name, albumArt, progress_ms, duration_ms) => {
    if(isNewTrack(playlistName, id)) {
      playlists[playlistName].currentlyPlaying.skip = {}
      playlists[playlistName].currentlyPlaying = {
        id: id,
        name: name,
        duration_ms: duration_ms,
        progress_ms: progress_ms,
        albumArt:albumArt,
        skip: {}
      }
      callback(null, playlistName, playlists[playlistName].currentlyPlaying)
    }
    setTimeout(function(){
      console.log("checking")
      nextTrack(playlistName, accessToken, callback)
    }, duration_ms - progress_ms);
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

const shouldPlaylistSkip = (playlistName) => {
  let skippers = Object.keys(playlists[playlistName].currentlyPlaying.skip).length
  let users = playlists[playlistName].users.length * 3 /5
  console.log(skippers, " vs ", users)
  return (skippers >= users)
}

const skipSong = (playlistName, callback) => {
  let options = {
    url: `https://api.spotify.com/v1/me/player/next`,
    method: "post",
    json: true,
    headers: {
      Authorization: "Bearer " + playlists[playlistName].accessToken
    }
  }

  request(options,(error, response, body) => {
    console.log(response.toJSON())
    if(response.statusCode == 401) {
      callback("Playlist Expired")
      return
    }
    if (error) {
      callback("bad request to spotify")
      return
    }
    callback()
    currentTrack(playlists[playlistName].accessToken, playlistName, (id, name, albumArt, progress_ms, duration_ms) => {
      if(isNewTrack(playlistName, id)) {
        playlists[playlistName].currentlyPlaying.skip = {}
        playlists[playlistName].currentlyPlaying = {
          id: id,
          name: name,
          duration_ms: duration_ms,
          progress_ms: progress_ms,
          albumArt:albumArt,
          skip: {}
        }
        callback(null, playlistName, playlists[playlistName].currentlyPlaying)
      }
    })
  })
}

const voteToSkip = (playlistName, socketId, callback) => {
  if(playlists[playlistName].currentlyPlaying.skip[socketId]){
    callback("already voted")
  }
  playlists[playlistName].currentlyPlaying.skip[socketId]= true;
  if (shouldPlaylistSkip(playlistName)) {
    skipSong(playlistName, () => {
      callback(null, playlists[playlistName])
    })
    return
  }
  callback(null, playlists[playlistName])
}

const updateRoomData = (sockets, callback) => {
  for(playlist in playlists){
    playlists[playlist].users = []
  }
  updateRoomPopulations(sockets)
  callback()
}

const removeSkipVote = (playlistName, socketId) => {
  if(playlists[playlistName]) {
    delete playlists[playlistName].currentlyPlaying.skip[socketId]
  }
}


module.exports = {
  getAllPlaylists: getAllPlaylists,
  addNewPlaylist: addNewPlaylist,
  verify: verify,
  getSecurePlaylist: getSecurePlaylist,
  addSongToPlaylist: addSongToPlaylist,
  voteToSkip: voteToSkip,
  removeSkipVote: removeSkipVote,
  updateRoomData: updateRoomData
}
