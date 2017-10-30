module.exports = (stateOperations, response) => {
  switch (response.type) {
    case "playlists":
      stateOperations.newPlaylists(response.data)
      stateOperations.update(response.reciever)
      return;
    case "approvedJoin":
      stateOperations.flashMessage("Joined Room")
      stateOperations.joinPlaylist(response.data)
      return;
    case "update":
      stateOperations.flashMessage("Added Song")
      stateOperations.update(response.reciever)
      break;
    case "currentlyPlaying":
      console.log(response.data.currentlyPlaying.progress_ms)
      break;
    default:
      stateOperations.flashMessage( null, response.error )
      return;
  }
}
