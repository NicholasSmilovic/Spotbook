absArtistHelpers = require("./absolute_artists/absolute-artist-helpers.js")
artistTrackHelpers = require("./artist_tracks/artist-track-helpers.js")
artistHelpers = require("./artists/artist-helpers.js")
playlistHelpers = require("./playlists/playlist-helpers.js")
trackHelpers = require("./tracks/track-helpers.js")
userAbsArtistHelpers = require("./user_absolute_artists/user-absolute-artist-helpers.js")
userTrackHelpers = require("./user_tracks/user-track-helpers.js")
userHelpers = require("./users/user-helpers.js")

module.exports = function makeDataHelpers(knex){
  return {
    absArtistHelpers: absArtistHelpers(knex),
    artistTrackHelpers: artistTrackHelpers(knex),
    artistHelpers: artistHelpers(knex),
    playlistHelpers: playlistHelpers(knex),
    trackHelpers: trackHelpers(knex),
    userAbsArtistHelpers: userAbsArtistHelpers(knex),
    userTrackHelpers: userTrackHelpers(knex),
    userHelpers: userHelpers(knex)
  }
}



/* PROCESS FOR DATA DUMP

1) spotify API request - top 200 tracks
2) - look at track
   - does it already exist in the database? (compare spotify IDS) getTrackBySpotifyID
   - if yes, look at next track at step 2
   - if no, step 3
3) - add track to tracks db table
   - find length of tracks table, id should be 1 more than the length
   - join new track's id with the current user that made the spotify request
4) - look at corresponding artist
   - does the artist already exist in the artists db table?
   - if no, add them
   - regardless of previous line, join track id to artist id (search artist by name, not id?)
5) look at next track and repeat, until all tracks have been dealt with


6) spotify API request - top 50 artists
7) - look at artist
   - does it already exist in the absolute artists table? (compare names)
   - if yes, look at next artist at step 6
   - if now, step 8
8) - add artist to absolute artists table
   - find length of absolute artists table, id should be 1 more than length
   - join new abs artist's id with the current user that made the request
9) look at the next artist and repeat, until all have been dealt with


END RESULT:
- latest user data of top tracks have been added to db, with their corresponding artist, and tracks have been associated with user
- latest user data of top artists have been added to absolute artists table, and the two have been associated

NEXT STEPS:
- this data will be retrieved using the helper functions, getUserTopTracks, getUserTopAbsArtists, for compatibility computation

*/



