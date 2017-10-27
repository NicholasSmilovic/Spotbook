const db = require('./ActivePlaylistsDB.js')

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
          data: {
            name: message.playlist.name
          },
          error: null
        }));
        callback(db.getAllPlaylists(), "all", "playlists", error);
      });
      break;
    case "joinPlaylist":
      db.verify(message.playlist, (error) => {
        if(error) {
          ws.send(JSON.stringify({
          reciever: "all",
          type: "declinedJoin",
          data: null,
          error: error
        }));
        }
      })
  }
}
