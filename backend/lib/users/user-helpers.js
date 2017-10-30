module.exports = (knex) => {

//USERS

function addUser(displayName, spotifyID, imageURL) {
  return new Promise(function(resolve, reject) {
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

  })
}

// addUser('Harry Potter', 'abcdefg', 'https://static.independent.co.uk/s3fs-public/styles/story_medium/public/thumbnails/image/2015/12/04/15/harry-potter-philosophers-stone.jpg')
//   .then(() => {
//     console.log(`success`)
//   })
//   .catch((e) => {
//     console.log(e)
//   })



function removeUser(id) {
  return new Promise(function(resolve, reject) {
    knex('users').where('id', id).del()
      .then(() => {
        console.log(`${id} was removed from the database`)
      })
      .catch(() => {
        console.log(`There was an error removing ${id} from the database`)
      })
  })
}

// removeUser(1)
//   .then(() => {
//     console.log('success')
//   })
//   .catch((e) => {
//     console.log('there was an error')
//   })



function getUserByID(id) {
  return new Promise(function(resolve, reject) {
  let user = {}
    knex('users').where('id', id)
      .then((val) => {
        user = {
          id: val[0].id,
          spotify_id: val[0].spotify_id,
          display_name: val[0].display_name,
          image_urls: val[0].image_urls,
          following_array: val[0].following.following_array
        }
      })
      .then(() => {
        resolve(user)
      })
      .catch(() => {
        console.log(`There was an error retrieving ${id} from the database`)
      })
  })
}

// getUserByID(1)
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((e) => {
//     console.log('error')
//   })




function getUserBySpotifyID(id) {
  return new Promise(function(resolve, reject) {
    let user = {}
    knex('users').where('spotify_id', id)
      .then((val) => {
        user = {
          id: val[0].id,
          spotify_id: val[0].spotify_id,
          display_name: val[0].display_name,
          image_urls: val[0].image_urls,
          following_array: val[0].following.following_array
        }
      })
      .then(() => {
        resolve(user)
      })
      .catch(() => {
        reject('user not found')
      })
  })
}

// getUserBySpotifyID('abcdefg')
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((e) => {
//     console.log(e)
//   })


// SELECT tracks.id FROM tracks
//   JOIN user_tracks ON tracks.id = track_id
//   JOIN users ON user_id = users.id
//   WHERE users.id = 1;
function getUserTopTracks(id) {
  return new Promise(function(resolve, reject) {
    knex.select('tracks.id').from('tracks')
      .innerJoin('user_tracks', 'tracks.id', 'track_id')
      .innerJoin('users', 'users.id', 'user_id')
      .where('users.id', id)
      .then((val) => {
        let tracks = []
        val.forEach((track => {
          tracks.push(track)
        }))
        resolve(tracks)
      })
      .catch(() => {
        console.log(`There was an error retrieving tracks by user id ${id} from the database`)
      })
  })
}

// getUserTopTracks(1)
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((e) => {
//     console.log(e)
//   })

function getUserTopFullTracks(id) {
  return new Promise(function(resolve, reject) {
    knex.select('tracks.id','tracks.track_name','tracks.spotify_id','tracks.danceability','tracks.energy','tracks.key','tracks.loudness','tracks.mode','tracks.speechiness','tracks.acousticness','tracks.instrumentalness','tracks.liveness','tracks.valence','tracks.tempo').from('tracks')
      .innerJoin('user_tracks', 'tracks.id', 'track_id')
      .innerJoin('users', 'users.id', 'user_id')
      .where('users.id', id)
      .then((val) => {
        let tracks = []
        val.forEach((track => {
          tracks.push(track)
        }))
        resolve(tracks)
      })
      .catch(() => {
        console.log(`There was an error retrieving tracks by user id ${id} from the database`)
      })
  })
}

// getUserTopFullTracks(1)
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((e) => {
//     console.log(e)
//   })

function getUserTopAbsArtists(id) {
  return new Promise(function(resolve, reject) {
    knex.select('absolute_artists.id').from('absolute_artists')
      .innerJoin('user_absolute_artists', 'absolute_artists.id', 'absolute_artist_id')
      .innerJoin('users', 'users.id', 'user_id')
      .where('users.id', id)
      .then((val) => {
        let artists = []
        val.forEach((artist => {
          artists.push(artist)
        }))
        resolve(artists)
      })
      .catch(() => {
        console.log(`There was an error retrieving artists by user id ${id} from the database`)
      })
  })
}

// getUserTopAbsArtists(2)
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((e) => {console.log(e)})

function getUserTopFullAbsArtists(id) {
  return new Promise(function(resolve, reject) {
    knex.select('absolute_artists.id', 'absolute_artists.artist_name', 'absolute_artists.genres', 'absolute_artists.spotify_id').from('absolute_artists')
      .innerJoin('user_absolute_artists', 'absolute_artists.id', 'absolute_artist_id')
      .innerJoin('users', 'users.id', 'user_id')
      .where('users.id', id)
      .then((val) => {
        let artists = []
        val.forEach((artist => {
          artists.push(artist)
        }))
        resolve(artists)
      })
      .catch(() => {
        console.log(`There was an error retrieving artists by user id ${id} from the database`)
      })
  })
}

// getUserTopFullAbsArtists(2)
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((e) => {console.log(e)})



function getUserPlaylists(id) {
  return new Promise(function(resolve, reject) {
    knex.from('playlists').where('spotify_owner_id', id)
      .then((val) => {
        let playlists = []
        val.forEach((playlist => {
          playlists.push(playlist)
        }))
        resolve(playlists)
      })
      .catch(() => {
        console.log(`There was an error retrieving user ${id}'s playlists from the database`)
      })
  })
}

// getUserPlaylists(1)
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((e) => {console.log(e)})


function getUserFollows(id) {
  return new Promise(function(resolve, reject) {
    knex.select('following').from('users')
      .where('id', id)
      .then((val) => {
        resolve(val[0].following.following_array)
      })
      .catch(() => {
        console.log(`There was an error retrieving user ${id}'s follows from the database`)
      })
  })
}


// getUserFollows(1)
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((e) => {
//     console.log(e)
//   })

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

function getUserTopTrackArtists(id) {
  return new Promise(function(resolve, reject) {
    knex.select('artists.id').from('artists')
      .innerJoin('artist_tracks', 'artists.id', 'artist_id')
      .innerJoin('tracks AS t', 't.id', 'track_id')
      .innerJoin('user_tracks AS u', 'u.track_id', 't.id')
      .innerJoin('users', 'users.id', 'user_id')
      .where('users.id', id)
      .then((val) => {
        resolve(val)
      })
      .catch (() => {
        console.log(`There was an error getting user ${id}'s tracks`)
      })
  })
}

// getUserTopTrackArtists(2)
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((e) => {
//     console.log(e)
//   })


function getAllUsers() {
  return new Promise(function(resolve, reject) {
    let users = []
    knex.select().table('users')
      .then((val) => {
        resolve(val)
      })
      .catch((e) => {
        console.log('there was an error retrieving all the users')
        reject(e)
      })
  })

}

// getAllUsers()
//   .then((response) => {
//     console.log(response)
//   })






  return {
    addUser: addUser,
    removeUser: removeUser,
    getAllUsers: getAllUsers,
    getUserByID: getUserByID,
    getUserBySpotifyID: getUserBySpotifyID,
    getUserTopTracks: getUserTopTracks,
    getUserTopFullTracks: getUserTopFullTracks,
    getUserTopTrackArtists: getUserTopTrackArtists,
    getUserTopAbsArtists: getUserTopAbsArtists,
    getUserTopFullAbsArtists: getUserTopFullAbsArtists,
    getUserPlaylists: getUserPlaylists,
    getUserFollows: getUserFollows
    //follow user and unfollow user coming this week!
  }
}






// getUserTopTrackArtists(1, function(response) {
//   console.log(response)
// })