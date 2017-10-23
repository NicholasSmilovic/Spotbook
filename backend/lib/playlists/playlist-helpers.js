module.exports = (knex) => {
  return {
    addPlaylist: addPlaylist,
    removePlaylist: removePlaylist,
    getPlaylistByID: getPlaylistByID
  }
}


function addPlaylist(playlistName, spotifyPlaylistID, spotifyOwnerID) {
  let newPlaylist = {
    playlist_name: playlistName,
    spotify_playlist_id: spotifyPlaylistID,
    spotify_owner_id: spotifyOwnerID
  }

  knex('playlists').insert(newPlaylist)
    .then(() => {
      console.log(`${playlistName} has beeen added to the database`)
    })
    .catch(() => {
      console.log(`There was an error adding ${playlistName} to the database`)
    })
}

// let playlist_name = "Playlist 1"
// let spotify_playlist_id = "12345"
// let spotify_owner_id = 1
// addPlaylist(playlist_name, spotify_playlist_id, spotify_owner_id)



function removePlaylist(id) {
  knex('playlists').where('id', id).del()
    .then(() => {
      console.log(`${id} was removed from the database`)
    })
    .catch(() => {
      console.log(`There was an error removing ${id} from the database`)
    })
}

// removePlaylist(3)


function getPlaylistByID(id, callback) {
  let playlist = {}
  knex('playlists').where('id', id)
    .then((val) => {
      playlist = {
        id: val[0].id,
        playlist_name: val[0].playlist_name,
        spotify_playlist_id: val[0].spotify_playlist_id,
        spotify_owner_id: val[0].spotify_owner_id,
      }
    })
    .then(() => {
      callback(playlist)
    })
    .catch(() => {
      console.log(`There was an error retrieving ${id} from the database`)
    })

}

// getPlaylistByID(1, function(response) {
//     console.log(response)
// })
