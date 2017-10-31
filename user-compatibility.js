module.exports  = () => {

const getUserTrackAudioFeatures = (topTracks) => {
      let danceability = 0
      let energy = 0
      let key = 0
      let loudness = 0
      let mode = 0
      let speechiness = 0
      let acousticness = 0
      let instrumentalness = 0
      let liveness = 0
      let valence = 0
      let tempo = 0

      for (let track in topTracks) {
        danceability += topTracks[track].danceability
        energy += topTracks[track].energy
        key += topTracks[track].key
        loudness += topTracks[track].loudness
        mode += topTracks[track].mode
        speechiness += topTracks[track].speechiness
        acousticness += topTracks[track].acousticness
        instrumentalness += topTracks[track].instrumentalness
        liveness += topTracks[track].liveness
        valence += topTracks[track].valence
        tempo += topTracks[track].tempo
      }

      key = Math.round(key/topTracks.length)
      mode = Math.round(mode/topTracks.length)

      let musicalKeys = {
        1: 'C',
        2: 'C#/Db',
        3: 'D',
        4: 'D#/Eb',
        5: 'E',
        6: 'F',
        7: 'F#/Gb',
        8: 'G',
        9: 'G#/Ab',
        10: 'A',
        11: 'A#/Bb',
        12: 'B'
      }

      let keyString = ''

      for (let musicalKey in musicalKeys) {
        if (musicalKey == key) {
          keyString = musicalKeys[musicalKey]
        }
      }

      let modeString = ''

      if (mode == 1) {
        modeString = 'Maj'
      } else {
        modeString = 'Min'
      }


      let userAudioTrackFeaturesAverages = {
        danceability: danceability/topTracks.length,
        energy: energy/topTracks.length,
        key: keyString,
        loudness: Number(Math.round((loudness/topTracks.length)+'e2')+'e-2'),
        mode: modeString,
        speechiness: speechiness/topTracks.length,
        acousticness: acousticness/topTracks.length,
        instrumentalness: instrumentalness/topTracks.length,
        liveness: liveness/topTracks.length,
        valence: valence/topTracks.length,
        tempo: Number(Math.round((tempo/topTracks.length)+'e2')+'e-2')
      }
      return userAudioTrackFeaturesAverages
    }

var getUniqueUserGenres = function(user1artists) {
  let uniqueGenres = []
  for (let i = 0; i < user1artists.items.length; i++) {
    for (let j = 0; j < user1artists.items[i].genres.length; j++) {
      if (uniqueGenres.indexOf(user1artists.items[i].genres[j]) === -1) {
        uniqueGenres.push(user1artists.items[i].genres[j])
      }
    }
  }
  return uniqueGenres
}

const userCompatibilityFunction = function(currentUserTopTracks, currentUserTopArtists, currentUserAudioTrackFeatures, otherUserComparisonData) {
      let userComparison = {
        id: otherUserComparisonData.userID,
        percentMatch: null
      }

      let user2artists = otherUserComparisonData.topArtists
      let user2tracks = otherUserComparisonData.topTracks
      let user2AudioTrackFeatures = otherUserComparisonData.userTrackAudioFeatures


      let matchesArr = []
      let percentMatch = 0
      let trackMatch = 0.05
      let trackMatches = 0
      let artistMatch = 0.05
      let artistMatches = 0
      let genreMatch = 0.85
      let genreMatches = 0
      // let audioFeaturesMatch = 0
      // let audioFeaturesMatches = 0

      let trackPercentileIncrease = 1/((currentUserTopTracks.length + user2tracks.length) / 2)

      for (let i in currentUserTopTracks) {
        for (let j in user2tracks) {
          if (currentUserTopTracks[i].track_name === user2tracks[j].track_name) {
            // console.log(user2tracks.items[j].name)
            trackMatches += trackPercentileIncrease
            break;
            // console.log(trackMatches)
          }
        }
      }

      // console.log(trackMatch*trackMatches)
      let artistPercentileIncrease = 1/((currentUserTopArtists.length + user2artists.length) / 2)

      for (let i = 0; i < currentUserTopArtists.length; i++) {
        for (let j = 0; j < user2artists.length; j++) {
          if (currentUserTopArtists[i].artist_name === user2artists[j].artist_name) {
            // console.log(user2artists.items[j].name)
            artistMatches += artistPercentileIncrease
            // console.log(artistMatches)
          }
        }
      }
      // console.log(artistMatches)

      let user1genres = getUniqueUserGenres(currentUserTopArtists)
      let user2genres = getUniqueUserGenres(user2artists)

      // console.log(user1genres.length)
      // console.log(user2genres.length)



      let genrePercentileIncrease = 1/((user1genres.length + user2genres.length) / 2)
      // console.log(genrePercentileIncrease)

      for (let i = 0; i < user1genres.length; i++) {
        for (let j = 0; j < user2genres.length; j++) {
          if (user1genres[i] === user2genres[j]) {
            // console.log(user2genres[j])
            genreMatches += genrePercentileIncrease
          }
        }
      }

      // console.log(trackMatches*trackMatch)
      // if (trackMatches < 0.2) {
      //   trackMatch = 0.2
      //   artistMatch = 0.2
      //   genreMatch = 0.3
      // }
      // if (artistMatches < 0.2 && trackMatches < 0.2) {
      //   trackMatch = 0.025
      //   artistMatch = 0.025
      //   genreMatch = 0.85
      // }
      // console.log(genreMatch)
      // console.log(`Track matches: ${trackMatches}`)
      // console.log(`Artist Matches: ${artistMatches}`)
      matchesArr.push(trackMatch*trackMatches)
      matchesArr.push(artistMatch*artistMatches)
      matchesArr.push(genreMatch*genreMatches)

      // console.log(user1AudioTrackFeatures)
      // console.log(user2AudioTrackFeatures)

      if (currentUserAudioTrackFeatures.danceability - user2AudioTrackFeatures.danceability < 0.05 && currentUserAudioTrackFeatures.danceability - user2AudioTrackFeatures.danceability > -0.05 ) {
        percentMatch += 0.05
      }

      if (currentUserAudioTrackFeatures.energy - user2AudioTrackFeatures.energy < 0.05 && currentUserAudioTrackFeatures.energy - user2AudioTrackFeatures.energy > -0.05 ) {
        percentMatch += 0.05
      }

      if (currentUserAudioTrackFeatures.key - user2AudioTrackFeatures.key < 1 && currentUserAudioTrackFeatures.key - user2AudioTrackFeatures.key > -1
        && currentUserAudioTrackFeatures.mode - user2AudioTrackFeatures.mode < 0.5 && currentUserAudioTrackFeatures.mode - user2AudioTrackFeatures.mode > -0.5 ) {
        percentMatch += 0.05
      }

      if (currentUserAudioTrackFeatures.loudness - user2AudioTrackFeatures.loudness < 3 && currentUserAudioTrackFeatures.loudness - user2AudioTrackFeatures.loudness > -3 ) {
        percentMatch += 0.05
      }

      if (currentUserAudioTrackFeatures.speechiness - user2AudioTrackFeatures.speechiness < 0.05 && currentUserAudioTrackFeatures.speechiness - user2AudioTrackFeatures.speechiness > -0.05 ) {
        percentMatch += 0.05
      }

      if (currentUserAudioTrackFeatures.acousticness - user2AudioTrackFeatures.acousticness < 0.05 && currentUserAudioTrackFeatures.acousticness - user2AudioTrackFeatures.acousticness > -0.05 ) {
        percentMatch += 0.05
      }

      if (currentUserAudioTrackFeatures.instrumentalness - user2AudioTrackFeatures.instrumentalness < 0.1 && currentUserAudioTrackFeatures.instrumentalness - user2AudioTrackFeatures.instrumentalness > -0.1 ) {
        percentMatch += 0.05
      }

      if (currentUserAudioTrackFeatures.liveness - user2AudioTrackFeatures.liveness < 0.05 && currentUserAudioTrackFeatures.liveness - user2AudioTrackFeatures.liveness > -0.05 ) {
        percentMatch += 0.05
      }

      if (currentUserAudioTrackFeatures.valence - user2AudioTrackFeatures.valence < 0.1 && currentUserAudioTrackFeatures.valence - user2AudioTrackFeatures.valence > -0.1 ) {
        percentMatch += 0.05
      }

      if (currentUserAudioTrackFeatures.tempo - user2AudioTrackFeatures.tempo < 10 && currentUserAudioTrackFeatures.tempo - user2AudioTrackFeatures.tempo > -10 ) {
        percentMatch += 0.05
      }

      // console.log(`Audio Parameter Percent Increase: ${percentMatch}`)
      console.log(matchesArr)

      matchesArr.map((match) => {
        return percentMatch += match
      })
        if (percentMatch > 1) {
          percentMatch = 1
        }
        userComparison.percentMatch = Math.round(percentMatch*100)

        return userComparison
      }

  return {
    getUserTrackAudioFeatures: getUserTrackAudioFeatures,
    getUniqueUserGenres: getUniqueUserGenres,
    userCompatibility: userCompatibilityFunction
  }
}
