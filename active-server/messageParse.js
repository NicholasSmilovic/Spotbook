const db = require('./ActivePlaylistsDB.js')

const respondWith = (reciever, type, data, error) => {
  return (JSON.stringify({
    reciever: "all",
    type: "declinedJoin",
    data: null,
    error: error
  }))
}

module.exports = (message, ws, callback) =>{
  console.log(message.type)

  switch(message.type){

    case "getPlaylists":
      callback(db.getAllPlaylists(), "all", "playlists", null, ws)
      break;


    case "startPlaylist":
      db.addNewPlaylist(message.playlist, message.accessToken, message.currentUser, (error, playlistName, playlistUpdate) => {
        if(error){
          callback(null, null, null, error, ws)
          return;
        }

        if(playlistUpdate) {
          callback(playlistUpdate, playlistName, "playerUpdate", error, ws);
          return
        }

        callback(db.getAllPlaylists(), "all", "playlists", error, ws);
        ws.send(JSON.stringify({
          reciever: "all",
          type: "approvedJoin",
          data: db.getSecurePlaylist(message.playlist.name),
          error: null
        }));
        callback(null, null, null, null, ws, ()=> {
          ws.playlist = message.playlist.name;
          ws.voteSkip = false;
          return ws
        })
      });
      break;


    case "joinPlaylist":
      db.verify(message.playlist, (data, error) => {
        if(error) {
          ws.send(JSON.stringify({
            reciever: "all",
            type: "declinedJoin",
            data: null,
            error: error
          }));
          return
        }
        ws.send(JSON.stringify({
          reciever: "all",
          type: "approvedJoin",
          data: data,
          error: null
        }));
        callback(null, null, null, null, ws, () => {
          ws.playlist = data.name
          ws.voteSkip = false;
          return ws
        })
      })
      break;


    case "addSongToPlaylist":
      db.verify(message.credentials, (data, error) => {
        if(error) {
          ws.send(JSON.stringify({
            reciever: "all",
            type: "Invalid Credentials",
            data: null,
            error: error
          }));
          return
        }
        db.addSongToPlaylist(message.playlist, message.track, (playlistName, error) => {
          if(error) {
            ws.send(JSON.stringify({
            reciever: "all",
            type: "Invalid Credentials",
            data: null,
            error: error
            }));
            return
          }
          callback(null, playlistName, "update", null, ws)
        })
      })
      break;

    case "skipSong":
      db.verify(message.credentials, (data, error) => {
        if(error) {
          ws.send(JSON.stringify({
            reciever: "all",
            type: "Invalid Credentials",
            data: null,
            error: error
          }));
          return
        }
        db.voteToSkip(message.credentials.name, ws.id, (error, playlist) => {
          if(error){
            ws.send(JSON.stringify({
              reciever: "all",
              type: "Invalid Vote",
              data: null,
              error: error
            }));
            return
          }
          callback(playlist.currentlyPlaying, playlist.name, "playerUpdate", null, ws)
        })
      })
      break;

    case "leaveRoom":
      callback(null, null, null, null, ws, () => {
        db.removeSkipVote(ws.playlist, ws.id)
        ws.playlist = "";
        return ws
      })
      break;


    default:
      return
  }
}
