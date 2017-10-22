module.exports = (knex) => {
  return {
    joinUserToAbsArtist: joinUserToAbsArtist,
    breakUserFromAbsArtist: breakUserFromAbsArtist
  }
}


function joinUserToAbsArtist(userID, artistID) {
  let newUserArtistRelationship = {
    user_id: userID,
    absolute_artist_id: artistID
  }

  knex('user_absolute_artists').insert(newUserArtistRelationship)
    .then(() => {
      console.log(`Artist ${artistID} is now listened to by User ${userID}`)
    })
    .catch((e) => {
      if (e.constraint === 'user_absolute_artists_pkey') {
        console.log(`User ${userID} already listens to that artist`)
      } else {
        console.log(`There was an error adding this artist-user relation to the database`)
      }
    })

}


// joinUserToAbsArtist(1,2)

function breakUserFromAbsArtist(userID, artistID) {
  knex('user_absolute_artists').where({
    user_id: userID,
    absolute_artist_id: artistID
  }).del()
    .then(() => {
      console.log(`The relation between User ${userID} and Artist ${artistID} has been broken`)
    })
    .catch(() => {
      console.log(`There was an error breaking the artist-user relation`)
    })
}


// breakUserFromAbsArtist(1,2)