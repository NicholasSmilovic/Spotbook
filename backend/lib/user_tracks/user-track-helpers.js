module.exports = (knex) => {

  function joinUserToTrack(userID, trackID) {
    return new Promise(function(resolve, reject) {
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
    })
  }
  // joinUserToTrack(2,1)

  function breakUserFromTrack(userID, trackID) {
    return new Promise(function(resolve, reject) {
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
    })
  }


  // breakUserFromTrack(2,1)
  return {
    joinUserToTrack: joinUserToTrack,
    breakUserFromTrack: breakUserFromTrack
  }
}
