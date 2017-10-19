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
}

function removeUser(id) {
  knex('users').where('id', id).del()
    .then(() => {
      console.log(`${id} was removed from the database`)
      return
    })
}


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
      console.log(`${newTrack.track_name} was added to the database`)
      return
    })

}

//hopefully this function will not be used in regular app usage, the more tracks the more data!
function removeTrack(id) {
  knex('tracks').where('id', id).del()
    .then(() => {
      console.log(`${id} was removed from the database`)
      return
    })
}

let track_name = "Hedwig's Theme"
let spotify_id = "12345"
let images = [
  {url: 'https://i.scdn.co/image/c429243cd056974175abe72a3142d3dccffc166a'},
  {url: 'https://i.scdn.co/image/31327f9fe6b6e0bd6e431a4add681397e95c6329'},
  {url: 'https://i.scdn.co/image/15fed5371098fbf631193332164fba1d0e08c878'},
]
let features = {
  danceability: 0.422,
  energy: 0.656,
  key: 4,
  loudness: -8.412,
  mode: 1,
  speechiness: 0.0397,
  acousticness: 0.0297,
  instrumentalness: 0.0279,
  liveness: 0.268,
  valence: 0.518,
  tempo: 173.930
}
// addTrack(track_name, spotify_id, images, features)
// removeTrack(6)
// newUser('Harry Potter', 'abcdefg', 'https://static.independent.co.uk/s3fs-public/styles/story_medium/public/thumbnails/image/2015/12/04/15/harry-potter-philosophers-stone.jpg')
// removeUser('Harry Potter', 3)








