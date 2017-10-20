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
function newUser(displayName, spotifyID, imageURL) {
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
      return
    })
    .catch(() => {
      console.log(`There was an error adding ${displayName} to the database`)
    })
}

function removeUser(id) {
  knex('users').where('id', id).del()
    .then(() => {
      console.log(`${id} was removed from the database`)
      return
    })
    .catch(() => {
      console.log(`There was an error removing ${id} from the database`)
    })
}

// newUser('Harry Potter', 'abcdefg', 'https://static.independent.co.uk/s3fs-public/styles/story_medium/public/thumbnails/image/2015/12/04/15/harry-potter-philosophers-stone.jpg')
// removeUser('Harry Potter', 3)



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
      return
    })
    .catch (() => {
      console.log(`There was an error adding ${trackName} to the database`)
    })

}

//hopefully this function will not be used in regular app usage, the more tracks the more data!
function removeTrack(id) {
  knex('tracks').where('id', id).del()
    .then(() => {
      console.log(`${id} was removed from the database`)
      return
    })
    .catch(() => {
      console.log(`There was an error removing ${id} from the database`)
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
// removeTrack(6)



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
      return
    })
    .catch(() => {
      console.log(`There was an error adding ${artistName} to the database`)
    })
}

function removeArtist(id) {
  knex('artists').where('id', id).del()
    .then(() => {
      console.log(`${id} was removed from the database`)
      return
    })
    .catch(() => {
      console.log(`There was an error removing ${id} from the database`)
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

// removeArtist(5)




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
      return
    })
    .catch(() => {
      console.log(`There was an error adding ${playlistName} to the database`)
    })
}


function removePlaylist(id) {
  knex('playlists').where('id', id).del()
    .then(() => {
      console.log(`${id} was removed from the database`)
      return
    })
    .catch(() => {
      console.log(`There was an error removing ${id} from the database`)
    })
}

// let playlist_name = "Playlist 1"
// let spotify_playlist_id = "12345"
// let spotify_owner_id = 1

// addPlaylist(playlist_name, spotify_playlist_id, spotify_owner_id)
// removePlaylist(3)



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







