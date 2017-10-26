const socket = new WebSocket("ws://localhost:8080")
const messageParse = require("./messageParse.js")

module.exports = (stateOperations) => {
  socket.onopen = () => {
    console.log("opened server");
  }

  socket.send(JSON.stringify({
    type: "getPlaylists"
  }))

  socket.onmessage = (event) => {
    messageParse(stateOperations, JSON.parse(event.data))
  }

  return {
    talk: () => {
      socket.send(JSON.stringify({
        type: "getPlaylists"
      }))
    },
    startNewActivePlaylist: (newPlaylists, accessToken, currentUser) => {
      socket.send(JSON.stringify({
        type: "startPlaylist",
        playlist: newPlaylists,
        accessToken: accessToken,
        currentUser: currentUser
      }))
    }
  }
}