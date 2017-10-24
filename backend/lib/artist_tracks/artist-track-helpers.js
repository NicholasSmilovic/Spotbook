module.exports = (knex) => {

  function joinArtistToTrack(artistID, trackID) {
    return new Promise(function(resolve, reject) {
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

    })

  }
  // joinArtistToTrack(3,1)



  function breakArtistFromTrack(artistID, trackID) {
    return new Promise(function(resolve, reject) {
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
    })

  }


  // breakArtistFromTrack(3,1)
  return {
    joinArtistToTrack: joinArtistToTrack,
    breakArtistFromTrack: breakArtistFromTrack
  }
}


