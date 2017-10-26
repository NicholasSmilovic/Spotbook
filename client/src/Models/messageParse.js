module.exports = (stateOperations, response) => {
  console.log("ayyy")
  console.log(response)
  switch (response.type) {
    case "playlists":
      stateOperations.newPlaylists(response.data)
      return;
    case "approvedJoin":
      stateOperations.joinPlaylist(response.data.name)
      return;
    default:
    debugger
      return;
  }
}
