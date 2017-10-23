module.exports = (knex) => {

  function getAbsArtistByID(id, callback) {
    let artist = {}
    knex('absolute_artists').where('id', id)
      .then((val) => {
        callback(val[0])
      })
      .catch(() => {
        console.log(`There was an error retrieving ${id} from the database`)
      })
    }

  // getAbsArtistByID(1, function(response) {
  //   console.log(response)
  // })


  function addAbsArtist(artistName, genresArray) {
    let newArtist = {
      artist_name: artistName,
      genres: {
        genres_array: genresArray
      }
    }

    knex('absolute_artists').insert(newArtist)
      .then(() => {
        console.log(`${artistName} has beeen added to the database`)
      })
      .catch(() => {
        console.log(`There was an error adding ${artistName} to the database`)
      })
  }

  // let artist_name = 'Kanye West'
  // let genres_array = [ "pop rap", "rap" ]
  // addAbsArtist(artist_name, genres_array)



  function removeAbsArtist(id) {
    knex('absolute_artists').where('id', id).del()
      .then(() => {
        console.log(`${id} was removed from the database`)
      })
      .catch(() => {
        console.log(`There was an error removing ${id} from the database`)
      })
  }

  // removeAbsArtist(3)

  return {
    getAbsArtistByID: getAbsArtistByID,
    addAbsArtist: addAbsArtist,
    removeAbsArtist: removeAbsArtist
  }
}



