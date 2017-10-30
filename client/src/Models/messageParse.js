module.exports = (stateOperations, response) => {
  console.log(response)
  switch (response.type) {
    case "playlists":
      stateOperations.newPlaylists(response.data)
      stateOperations.update(response.reciever, response.data)
      return;
    case "approvedJoin":
      stateOperations.flashMessage("Joined Room")
      stateOperations.joinPlaylist(response.data)
      return;
    case "update":
      stateOperations.flashMessage("Added Song")
      stateOperations.update(response.reciever)
      break;
    case "playerUpdate":
      stateOperations.updatePlayer(response.reciever, response.data)
      break;
    default:
      stateOperations.flashMessage( null, response.error )
      return;
  }
}
