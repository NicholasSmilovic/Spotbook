module.exports = (knex) => {
  // USERS FUNCTIONS
  function addUser(displayName, spotifyID, imageURL) {
    let newUser = {
      display_name: displayName,
      spotify_id: spotifyID,
      image_urls: {
        image: imageURL
      },
      following: {
        following_array: []
      }
    }

    knex('users').insert(newUser)
      .then(() => {
        console.log(`${displayName} was added to the database!`)
      })
      .catch(() => {
        console.log(`There was an error adding ${displayName} to the database`)
      })
  }

  // newUser('Harry Potter', 'abcdefg', 'https://static.independent.co.uk/s3fs-public/styles/story_medium/public/thumbnails/image/2015/12/04/15/harry-potter-philosophers-stone.jpg')


  function removeUser(id) {
    knex('users').where('id', id).del()
      .then(() => {
        console.log(`${id} was removed from the database`)
      })
      .catch(() => {
        console.log(`There was an error removing ${id} from the database`)
      })
  }

  // removeUser('Harry Potter', 3)



  function getUserByID(id, callback) {
    let user = {}
    knex('users').where('id', id)
      .then((val) => {
        user = {
          id: val[0].id,
          display_name: val[0].display_name,
          image_urls: val[0].image_urls,
          following_array: val[0].following.following_array
        }
      })
      .then(() => {
        callback(user)
      })
      .catch(() => {
        console.log(`There was an error retrieving ${id} from the database`)
      })

  }

  // getUserByID(1, function(response) {
  //     console.log(response)
  // })




  function getUserBySpotifyID(id, callback) {
    let user = {}
    knex('users').where('spotify_id', id)
      .then((val) => {
        user = {
          id: val[0].id,
          display_name: val[0].display_name,
          image_urls: val[0].image_urls,
          following_array: val[0].following.following_array
        }
      })
      .then(() => {
        callback(true, user)
      })
      .catch(() => {
        console.log(`There was an error retrieving ${id} from the database`)
        callback(false, {})
      })

  }


  // SELECT tracks.id FROM tracks
  //   JOIN user_tracks ON tracks.id = track_id
  //   JOIN users ON user_id = users.id
  //   WHERE users.id = 1;
  function getUserTopTracks(id, callback) {
    knex.select('tracks.id').from('tracks')
      .innerJoin('user_tracks', 'tracks.id', 'track_id')
      .innerJoin('users', 'users.id', 'user_id')
      .where('users.id', id)
      .then((val) => {
        let tracks = []
        val.forEach((track => {
          tracks.push(track)
        }))
        callback(tracks)
      })
      .catch(() => {
        console.log(`There was an error retrieving tracks by user id ${id} from the database`)
      })
  }

  // getUserTopTracks(1, function(response) {
  //   console.log(response)
  // })

  function getUserTopAbsArtists(id, callback) {
    knex.select('absolute_artists.id').from('absolute_artists')
      .innerJoin('user_absolute_artists', 'absolute_artists.id', 'absolute_artist_id')
      .innerJoin('users', 'users.id', 'user_id')
      .where('users.id', id)
      .then((val) => {
        let artists = []
        val.forEach((artist => {
          artists.push(artist)
        }))
        callback(artists)
      })
      .catch(() => {
        console.log(`There was an error retrieving artists by user id ${id} from the database`)
      })
  }

  // getUserTopAbsArtists(2, function(response) {
  //   console.log(response)
  // })



  function getUserPlaylists(id, callback) {
    knex.from('playlists').where('spotify_owner_id', id)
      .then((val) => {
        let playlists = []
        val.forEach((playlist => {
          playlists.push(playlist)
        }))
        callback(playlists)
      })
      .catch(() => {
        console.log(`There was an error retrieving user ${id}'s playlists from the database`)
      })
  }

  // getUserPlaylists(1, function(response) {
  //   console.log(response)
  // })


  function getUserFollows(id, callback) {
    knex.select('following').from('users')
      .where('id', id)
      .then((val) => {
        callback(val[0].following.following_array)
      })
      .catch(() => {
        console.log(`There was an error retrieving user ${id}'s follows from the database`)
      })
  }


  // getUserFollows(1, function(response) {
  //   console.log(response)
  // })

  // DOESN'T WORK
  function followUser(myID, theirID) {
    getUserByID(myID, function(response) {
      response.following_array.push(theirID)
      knex('users').where('id', myID)
        .update({following: {'following_array': response.following_array}})
        .then(() => {
          console.log(`User ${myID} stopped following user ${theirID}`)
        })
        .catch(() => {
          console.log(`There was an error. No change to follows !`)
        })
    })
  }

  // followUser(1,3)


  // DOESN'T WORK
  function unfollowUser(myID, theirID) {
    getUserByID(myID, function(response) {
      response.following_array.forEach((follow, index) => {
        if (follow === theirID) {
          response.following_array.splice(index, 1)
        } else {
          console.log(`User ${myID} does not follow user ${theirID}`)
        }
      })
      knex('users').where('id', myID)
        .update({following: {'following_array': response.following_array}})
        .then(() => {
          console.log(`User ${myID} stopped following user ${theirID}`)
        })
        .catch(() => {
          console.log(`There was an error. No change to follows !`)
        })
    })
  }

  // unfollowUser(1, 2)


  // SELECT artists.id FROM artists
  //   JOIN artist_tracks ON artists.id = artist_id
  //   JOIN tracks AS t ON t.id = track_id
  //   JOIN user_tracks AS u ON u.track_id = t.id
  //   JOIN users ON users.id = user_id
  //   WHERE users.id = 2;

  function getUserTopTrackArtists(id, callback) {
    knex.select('artists.id').from('artists')
      .innerJoin('artist_tracks', 'artists.id', 'artist_id')
      .innerJoin('tracks AS t', 't.id', 'track_id')
      .innerJoin('user_tracks AS u', 'u.track_id', 't.id')
      .innerJoin('users', 'users.id', 'user_id')
      .where('users.id', id)
      .then((val) => {
        callback(val)
      })
      .catch (() => {
        console.log(`There was an error getting user ${id}'s tracks`)
      })
  }

  return {
    addUser: addUser,
    removeUser: removeUser,
    getUserByID: getUserByID,
    getUserBySpotifyID: getUserBySpotifyID,
    getUserTopTracks: getUserTopTracks,
    getUserTopTrackArtists: getUserTopTrackArtists,
    getUserTopAbsArtists: getUserTopAbsArtists,
    getUserPlaylists: getUserPlaylists,
    getUserFollows: getUserFollows
    //follow user and unfollow user coming this week!
  }
}






// getUserTopTrackArtists(1, function(response) {
//   console.log(response)
// })
