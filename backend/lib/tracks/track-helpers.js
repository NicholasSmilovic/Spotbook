module.exports = (knex) => {

  function addTrack(trackName, spotifyID, imageURLs, audioFeatures) {
    return new Promise(function(resolve, reject) {
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
        .then((response) => {
          console.log(`${trackName} was added to the database`)
          resolve()
        })
        .catch ((e) => {
          console.log(`There was an error adding ${trackName} to the database`)
          reject(e)
        })
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
    return new Promise(function(resolve, reject) {
    knex('tracks').where('id', id).del()
      .then(() => {
        console.log(`${id} was removed from the database`)
      })
      .catch(() => {
        console.log(`There was an error removing ${id} from the database`)
      })
    })
  }

  // removeTrack(6)




  function getTrackByID(id) {
    return new Promise(function(resolve, reject) {
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
        resolve(track)
      })
      .catch(() => {
        console.log(`There was an error retrieving ${id} from the database`)
      })
    })
  }

  // getTrackByID(1, function(response) {
  //     console.log(response)
  // })


  // SELECT users.id FROM users
  //   JOIN user_tracks ON users.id = user_id
  //   JOIN tracks ON tracks.id = track_id
  //   WHERE track_id = 1;
  function getTrackListeners(id) {
    return new Promise(function(resolve, reject) {
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
        resolve(users)
      })
      .catch(() => {
        console.log(`There was an error retrieving users by ${id} from the database`)
      })
    })
  }


  // getTrackListeners(1, function(response) {
  //   console.log(response)
  // })




  function getTrackBySpotifyID(id, trackToAdd) { //track to add only used in data stash
    return new Promise(function(resolve, reject) {
    let track = {}
    knex('tracks').where('spotify_id', id)
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
        resolve(track)
      })
      .catch(() => {
        resolve(trackToAdd)
      })
    })
  }

  function getArtistFromTrack(id) {
    // console.log('***** INSIDE HELPER *****')
    return new Promise(function(resolve, reject) {
      knex.select('artists.id').from('artists')
        .innerJoin('artist_tracks', 'artist_id', 'artists.id')
        .innerJoin('tracks', 'track_id', 'tracks.id')
        .where('tracks.id', id)
        // .then((val) => {
        //   resolve(val[0].id)
        // })
        .then((val) => {
          resolve(val[0])
        })
        .catch(() => {
          console.log(`\nThere was an error retrieving track ${id}'s artist' from the database\n`)
        })
    })
  }



  return {
    addTrack: addTrack,
    removeTrack: removeTrack,
    getTrackByID: getTrackByID,
    getTrackListeners: getTrackListeners,
    getTrackBySpotifyID: getTrackBySpotifyID,
    getArtistFromTrack: getArtistFromTrack
  }
}
