module.exports = (stateOperations, response) => {
  console.log("ayyy")
  console.log(response)
  switch (response.type) {
    case "playlists":
      stateOperations.newPlaylists(response.data)
      return;
    case "approvedJoin":
      stateOperations.flashMessage("Joined Room")
      stateOperations.joinPlaylist(response.data)
      return;
    case "update":
      stateOperations.flashMessage("Added Song")
      stateOperations.update(response.reciever)
      break;
    default:
      stateOperations.flashMessage( null, response.error )
      return;
  }
}
