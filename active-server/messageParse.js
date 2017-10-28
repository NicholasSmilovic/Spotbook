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
      callback(db.getAllPlaylists(), "all", "playlists", null)
      break;
    case "startPlaylist":
      db.addNewPlaylist(message.playlist, message.accessToken, message.currentUser, (error) => {
        console.log("error: ", error)
        if(error){
          callback(null, null, null, error)
          return;
        }
        ws.send(JSON.stringify({
          reciever: "all",
          type: "approvedJoin",
          data: db.getSecurePlaylist(message.playlist.name),
          error: null
        }));
        callback(db.getAllPlaylists(), "all", "playlists", error);
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
        return data.name
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
          callback(null, playlistName, "update", null)
        })
      })
    default:
      return
  }
}
