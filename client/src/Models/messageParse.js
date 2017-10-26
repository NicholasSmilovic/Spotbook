module.exports = (stateOperations, response) => {
  console.log("ayyy")
  switch (response.type) {
    case "playlists":
      stateOperations.newPlaylists(response.data)
      return;
    default:
    return
  }
}
