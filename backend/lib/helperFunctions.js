require('dotenv').config({path: './../.env'})


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
      resolve(true)
    })
    .catch(() => {
      console.log(`There was an error adding ${displayName} to the database`)
      reject(false)
    })

  })
}


function getAllUsers() {
  return new Promise(function(resolve, reject) {
    let users = []
    knex.select('display_name', 'spotify_id', 'image_urls', 'following').from('users')
      .then((val) => {
        resolve(val)
      })
      .catch((e) => {
        console.log('there was an error retrieving all the users')
        reject(e)
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

// getAllUsers()
//   .then((response) => {
//     console.log(response)
//   })


function getNumberOfTracks() {
  return new Promise(function(resolve, reject) {
    knex('tracks').count('id')
      .then((count) => {
        resolve(count)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

getNumberOfTracks()
  .then((response) => {
    console.log(response)
  })



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

knex.destroy()








