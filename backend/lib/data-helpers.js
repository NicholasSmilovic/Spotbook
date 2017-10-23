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





