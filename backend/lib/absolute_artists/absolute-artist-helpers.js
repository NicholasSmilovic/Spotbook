module.exports = (knex) => {

  function getAbsArtistByID(id) {
    return new Promise(function(resolve, reject) {
      let artist = {}
      knex('absolute_artists').where('id', id)
        .then((val) => {
          resolve(val[0])
        })
        .catch(() => {
          console.log(`There was an error retrieving ${id} from the database`)
        })
    })
  }

  // getAbsArtistByID(1, function(response) {
  //   console.log(response)
  // })


  function addAbsArtist(artistName, spotifyID, genresArray) {
    return new Promise(function(resolve, reject) {
      let newArtist = {
        artist_name: artistName,
        spotify_id: spotifyID,
        genres: {
          genres_array: genresArray
        }
      }

      knex('absolute_artists').insert(newArtist)
        .then(() => {
          console.log(`${artistName} has beeen added to absolute artists`)
          resolve()
        })
        .catch(() => {
          console.log(`There was an error adding ${artistName} to the database`)
          reject()
        })
    })
  }

  // let artist_name = 'Kanye West'
  // let spotify_id = '1234'
  // let genres_array = [ "pop rap", "rap" ]
  // addAbsArtist(artist_name, spotify_id, genres_array)



  function removeAbsArtist(id) {
    return new Promise(function(resolve, reject) {
      knex('absolute_artists').where('id', id).del()
        .then(() => {
          console.log(`${id} was removed from the database`)
        })
        .catch(() => {
          console.log(`There was an error removing ${id} from the database`)
        })
    })
  }

  // removeAbsArtist(3)


  function getAbsArtistBySpotifyID(id, artistToAdd) { //artist to add only used in data stash
    return new Promise(function(resolve, reject) {
    let artist = {}
    knex('absolute_artists').where('spotify_id', id)
      .then((val) => {
        artist = {
          id: val[0].id,
          artist_name: val[0].artist_name,
          spotify_id: val[0].spotify_id,
          genres: val[0].genres.genres_array
        }
      })
      .then(() => {
        resolve(artist)
      })
      .catch(() => {
        resolve(artistToAdd)
      })
    })
  }

  return {
    getAbsArtistByID: getAbsArtistByID,
    getAbsArtistBySpotifyID: getAbsArtistBySpotifyID,
    addAbsArtist: addAbsArtist,
    removeAbsArtist: removeAbsArtist
  }
}



