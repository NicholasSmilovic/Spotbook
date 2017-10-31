module.exports = (knex) => {

  function addArtist(artistName, spotifyID, imageURLs, genresArray) {
    return new Promise(function(resolve, reject) {
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
          resolve()
        })
        .catch((e) => {
          console.log(`There was an error adding ${artistName} to the database`)
          reject(e)
        })
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
    return new Promise(function(resolve, reject) {
      knex('artists').where('id', id).del()
        .then(() => {
          console.log(`${id} was removed from the database`)
        })
        .catch(() => {
          console.log(`There was an error removing ${id} from the database`)
        })
    })
  }

  // removeArtist(5)



  function getArtistByID(id) {
    return new Promise(function(resolve, reject) {

      // console.log('***** inside getArtistByID helper *****')

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
          resolve(artist)
        })
        .catch(() => {
          console.log(`There was an error retrieving ${id} from the database`)
        })
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

  function getArtistTracks(id) {
    return new Promise(function(resolve, reject) {
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
        resolve(tracks)
      })
      .catch(() => {
        console.log(`There was an error retrieving tracks by ${id} from the database`)
      })
    })
  }

  // getArtistTracks(1, function(response) {
  //   console.log(response)
  // })


//Better way of doing functions with promises, something to think about
  // function getArtistBySpotifyID(id, artistToAdd) { //artist to add only used in data stash
  //   return knex('artists').where('spotify_id', id)
  //     .then((val) => {
  //       return {
  //         id: val[0].id,
  //         artist_name: val[0].artist_name,
  //         spotify_id: val[0].spotify_id,
  //         image_urls: {
  //           large: val[0].image_urls.large,
  //           medium: val[0].image_urls.medium,
  //           small: val[0].image_urls.small
  //         },
  //         genres: val[0].genres.genres_array
  //       }
  //     })
  //     .catch(() => artistToAdd)
  // }


  function getArtistBySpotifyID(id, artistToAdd) { //artist to add only used in data stash

    return new Promise(function(resolve, reject) {
    let artist = {}
    knex('artists').where('spotify_id', id)
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
        resolve(artist)
      })
      .catch(() => {
        resolve(artistToAdd)
      })
    })
  }


  return {
    addArtist: addArtist,
    removeArtist: removeArtist,
    getArtistByID: getArtistByID,
    getArtistTracks: getArtistTracks,
    getArtistBySpotifyID: getArtistBySpotifyID
  }
}





