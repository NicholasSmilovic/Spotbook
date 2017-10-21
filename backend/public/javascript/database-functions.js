require('dotenv').config({path: './../../.env'})


var knexConfig = {
  client: 'pg',
  connection: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  }
};


var knex = require("knex")(knexConfig);




// USERS FUNCTIONS
function addUser(displayName, spotifyID, imageURL) {
  let newUser = {
    display_name: displayName,
    spotify_id: spotifyID,
    image_urls: {
      image: imageURL
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




// TRACK FUNCTIONS
function addTrack(trackName, spotifyID, imageURLs, audioFeatures) {
  let newTrack = {
    track_name: trackName,
    spotify_id: spotifyID,
    image_urls: {
      large: imageURLs[0].url,
      medium: imageURLs[1].url,
      small: imageURLs[2].url,
    },
    danceability: audioFeatures.danceability,
    energy: audioFeatures.energy,
    key: audioFeatures.key,
    loudness: audioFeatures.loudness,
    mode: audioFeatures.mode,
    speechiness: audioFeatures.speechiness,
    acousticness: audioFeatures.acousticness,
    instrumentalness: audioFeatures.instrumentalness,
    liveness: audioFeatures.liveness,
    valence: audioFeatures.valence,
    tempo: audioFeatures.tempo
  }

  knex('tracks').insert(newTrack)
    .then(() => {
      console.log(`${trackName} was added to the database`)
    })
    .catch (() => {
      console.log(`There was an error adding ${trackName} to the database`)
    })

}

// let track_name = "Hedwig's Theme"
// let spotify_id = "12345"
// let images = [
//   {url: 'https://i.scdn.co/image/c429243cd056974175abe72a3142d3dccffc166a'},
//   {url: 'https://i.scdn.co/image/31327f9fe6b6e0bd6e431a4add681397e95c6329'},
//   {url: 'https://i.scdn.co/image/15fed5371098fbf631193332164fba1d0e08c878'},
// ]
// let features = {
//   danceability: 0.422,
//   energy: 0.656,
//   key: 4,
//   loudness: -8.412,
//   mode: 1,
//   speechiness: 0.0397,
//   acousticness: 0.0297,
//   instrumentalness: 0.0279,
//   liveness: 0.268,
//   valence: 0.518,
//   tempo: 173.930
// }
// addTrack(track_name, spotify_id, images, features)


//hopefully this function will not be used in regular app usage, the more tracks the more data!
function removeTrack(id) {
  knex('tracks').where('id', id).del()
    .then(() => {
      console.log(`${id} was removed from the database`)
    })
    .catch(() => {
      console.log(`There was an error removing ${id} from the database`)
    })
}

// removeTrack(6)




function getTrackByID(id, callback) {
  let track = {}
  knex('tracks').where('id', id)
    .then((val) => {
      track = {
        id: val[0].id,
        track_name: val[0].track_name,
        spotify_id: val[0].spotify_id,
        image_urls: {
          large: val[0].image_urls.large,
          medium: val[0].image_urls.medium,
          small: val[0].image_urls.small,
        },
        danceability: val[0].danceability,
        energy: val[0].energy,
        key: val[0].key,
        loudness: val[0].loudness,
        mode: val[0].mode,
        speechiness: val[0].speechiness,
        acousticness: val[0].acousticness,
        instrumentalness: val[0].instrumentalness,
        liveness: val[0].liveness,
        valence: val[0].valence,
        tempo: val[0].tempo
      }
    })
    .then(() => {
      callback(track)
    })
    .catch(() => {
      console.log(`There was an error retrieving ${id} from the database`)
    })

}

// getTrackByID(1, function(response) {
//     console.log(response)
// })


// SELECT users.id FROM users
//   JOIN user_tracks ON users.id = user_id
//   JOIN tracks ON tracks.id = track_id
//   WHERE track_id = 1;
function getTrackListeners(id, callback) {
  knex.select('users.id').from('users')
    .innerJoin('user_tracks', 'user_id', 'users.id')
    .innerJoin('tracks', 'track_id', 'tracks.id')
    .where('tracks.id', id)
    .orderBy('users.id')
    .then((val) => {
      let users = []
      val.forEach((user => {
        users.push(user)
      }))
      callback(users)
    })
    .catch(() => {
      console.log(`There was an error retrieving users by ${id} from the database`)
    })
}


// getTrackListeners(1, function(response) {
//   console.log(response)
// })





// ARTIST FUNCTIONS
function addArtist(artistName, spotifyID, imageURLs, genresArray) {
  let newArtist = {
    artist_name: artistName,
    spotify_id: spotifyID,
    image_urls: {
      large: imageURLs[0].url,
      medium: imageURLs[1].url,
      small: imageURLs[2].url
    },
    genres: {
      genres_array: genresArray
    }
  }

  knex('artists').insert(newArtist)
    .then(() => {
      console.log(`${artistName} has beeen added to the database`)
    })
    .catch(() => {
      console.log(`There was an error adding ${artistName} to the database`)
    })
}

// let artist_name = 'Kanye West'
// let spotify_id = 'ab1235'
// let image_urls = [
//   {url: 'https://i.scdn.co/image/c429243cd056974175abe72a3142d3dccffc166a'},
//   {url: 'https://i.scdn.co/image/31327f9fe6b6e0bd6e431a4add681397e95c6329'},
//   {url: 'https://i.scdn.co/image/15fed5371098fbf631193332164fba1d0e08c878'},
// ]
// let genres_array = [ "pop rap", "rap" ]
// addArtist(artist_name, spotify_id, image_urls, genres_array)



function removeArtist(id) {
  knex('artists').where('id', id).del()
    .then(() => {
      console.log(`${id} was removed from the database`)
    })
    .catch(() => {
      console.log(`There was an error removing ${id} from the database`)
    })
}

// removeArtist(5)



function getArtistByID(id, callback) {
  let artist = {}
  knex('artists').where('id', id)
    .then((val) => {
      artist = {
        id: val[0].id,
        artist_name: val[0].artist_name,
        spotify_id: val[0].spotify_id,
        image_urls: {
          large: val[0].image_urls.large,
          medium: val[0].image_urls.medium,
          small: val[0].image_urls.small
        },
        genres: val[0].genres.genres_array
      }
    })
    .then(() => {
      callback(artist)
    })
    .catch(() => {
      console.log(`There was an error retrieving ${id} from the database`)
    })

}

// getArtistByID(1, function(response) {
//     console.log(response)
// })


// SELECT * FROM tracks
//   JOIN artist_tracks ON tracks.id = track_id
//   JOIN artists ON artist_id = artists.id
//   WHERE artists.id = 1
//   ORDER BY track_name desc;

function getArtistTracks(id, callback) {
  knex.from('tracks')
    .innerJoin('artist_tracks', 'track_id', 'tracks.id')
    .innerJoin('artists', 'artist_id', 'artists.id')
    .where('artists.id', id)
    .orderBy('track_name', 'desc')
    .then((val) => {
      let tracks = []
      val.forEach((track => {
        tracks.push(track)
      }))
      callback(tracks)
    })
    .catch(() => {
      console.log(`There was an error retrieving tracks by ${id} from the database`)
    })
}

// getArtistTracks(1, function(response) {
//   console.log(response)
// })



// PLAYLIST FUNCTIONS

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



// CONNECTION FUNCTIONS

function joinArtistToTrack(artistID, trackID) {
  let newArtistTrackRelationship = {
    artist_id: artistID,
    track_id: trackID
  }

  knex('artist_tracks').insert(newArtistTrackRelationship)
    .then(() => {
      console.log(`Track ${trackID} is now performed by Artist ${artistID}`)
    })
    .catch((e) => {
      if (e.constraint === 'artist_tracks_pkey') {
        console.log(`Artist ${artistID} already performs that track`)
      } else {
        console.log(`There was an error adding this track-artist relation to the database`)
      }
    })

}

function breakArtistFromTrack(artistID, trackID) {
  knex('artist_tracks').where({
    artist_id: artistID,
    track_id: trackID
  }).del()
    .then(() => {
      console.log(`The relation between Artist ${artistID} and Track ${trackID} has been broken`)
    })
    .catch(() => {
      console.log(`There was an error breaking the artist-track relation`)
    })
}


// joinArtistToTrack(3,1)
// breakArtistFromTrack(3,1)


function joinUserToTrack(userID, trackID) {
  let newUserTrackRelationship = {
    user_id: userID,
    track_id: trackID
  }

  knex('user_tracks').insert(newUserTrackRelationship)
    .then(() => {
      console.log(`Track ${trackID} is now listened to by User ${userID}`)
    })
    .catch((e) => {
      if (e.constraint === 'user_tracks_pkey') {
        console.log(`User ${userID} already listens to that track`)
      } else {
        console.log(`There was an error adding this track-user relation to the database`)
      }
    })

}

function breakUserFromTrack(userID, trackID) {
  knex('user_tracks').where({
    user_id: userID,
    track_id: trackID
  }).del()
    .then(() => {
      console.log(`The relation between User ${userID} and Track ${trackID} has been broken`)
    })
    .catch(() => {
      console.log(`There was an error breaking the track-user relation`)
    })
}


// joinUserToTrack(2,1)
// breakUserFromTrack(2,1)











knex.destroy()







