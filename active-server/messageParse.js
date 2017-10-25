const db = require('./ActivePlaylistsDB.js')()

module.exports = (message, callback) =>{
  console.log(message.type)
  switch(message.type){
    case "getPlaylists":
      callback(db.getAllPlaylists(), "all", "playlists", null)
      break;
  }
}
