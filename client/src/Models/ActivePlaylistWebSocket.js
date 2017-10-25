const determineMessageType = (response) => {
  switch (response.type) {
    case "test":
    return;
    default:
    return
  }
}

const socket = new WebSocket("ws://localhost:8080")

module.exports = {
  initailizeConnection: (update) => {
    socket.onopen = () => {
      console.log("opened server");
      socket.send(JSON.stringify({
        type: "test"
      }))
    }

    socket.onmessage = (event) => {
      debugger
      determineMessageType(JSON.parse(event.data))
    }
  },
  talk: () =>{
    socket.send(JSON.stringify({
      type: "getPlaylists"
    }))
  }
}
