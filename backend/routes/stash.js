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


let tracks = {
  "items" : [ {
    "album" : {
      "album_type" : "SINGLE",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/album/7uSaHPXSYaRB3FxLOmatG9"
      },
      "href" : "https://api.spotify.com/v1/albums/7uSaHPXSYaRB3FxLOmatG9",
      "id" : "7uSaHPXSYaRB3FxLOmatG9",
      "images" : [ {
        "height" : 640,
        "url" : "https://i.scdn.co/image/1e1217a12d840780b5dbd99ee4f8a9b9146490bb",
        "width" : 640
      }, {
        "height" : 300,
        "url" : "https://i.scdn.co/image/0937409c3eb1a5c68a950f97864edc23b4041e8c",
        "width" : 300
      }, {
        "height" : 64,
        "url" : "https://i.scdn.co/image/79272442d6c545220269deba88ab99da1760b191",
        "width" : 64
      } ],
      "name" : "Provider",
      "type" : "album",
      "uri" : "spotify:album:7uSaHPXSYaRB3FxLOmatG9"
    },
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/2h93pZq0e7k5yf4dywlkpM"
      },
      "href" : "https://api.spotify.com/v1/artists/2h93pZq0e7k5yf4dywlkpM",
      "id" : "2h93pZq0e7k5yf4dywlkpM",
      "name" : "Frank Ocean",
      "type" : "artist",
      "uri" : "spotify:artist:2h93pZq0e7k5yf4dywlkpM"
    } ],
    "disc_number" : 1,
    "duration_ms" : 243238,
    "explicit" : false,
    "external_ids" : {
      "isrc" : "QM24S1702752"
    },
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/6R6ihJhRbgu7JxJKIbW57w"
    },
    "href" : "https://api.spotify.com/v1/tracks/6R6ihJhRbgu7JxJKIbW57w",
    "id" : "6R6ihJhRbgu7JxJKIbW57w",
    "is_playable" : true,
    "name" : "Provider",
    "popularity" : 79,
    "preview_url" : "https://p.scdn.co/mp3-preview/4c3b73668d8159e35fec3404e00136451d4a3a52",
    "track_number" : 1,
    "type" : "track",
    "uri" : "spotify:track:6R6ihJhRbgu7JxJKIbW57w"
  }, {
    "album" : {
      "album_type" : "SINGLE",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/album/03v3s0EfBKb1PPViZGOyyY"
      },
      "href" : "https://api.spotify.com/v1/albums/03v3s0EfBKb1PPViZGOyyY",
      "id" : "03v3s0EfBKb1PPViZGOyyY",
      "images" : [ {
        "height" : 640,
        "url" : "https://i.scdn.co/image/ce14b5a2ac07b85dcba84ff62bf88d7c2d5b839d",
        "width" : 640
      }, {
        "height" : 300,
        "url" : "https://i.scdn.co/image/53dbdcdb8d577d54dc01b002c1a8106f7ba684f7",
        "width" : 300
      }, {
        "height" : 64,
        "url" : "https://i.scdn.co/image/4278a56953ae46841663ceca0257b437ea34fbb1",
        "width" : 64
      } ],
      "name" : "By Your Side",
      "type" : "album",
      "uri" : "spotify:album:03v3s0EfBKb1PPViZGOyyY"
    },
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/3mIj9lX2MWuHmhNCA7LSCW"
      },
      "href" : "https://api.spotify.com/v1/artists/3mIj9lX2MWuHmhNCA7LSCW",
      "id" : "3mIj9lX2MWuHmhNCA7LSCW",
      "name" : "The 1975",
      "type" : "artist",
      "uri" : "spotify:artist:3mIj9lX2MWuHmhNCA7LSCW"
    } ],
    "disc_number" : 1,
    "duration_ms" : 295151,
    "explicit" : false,
    "external_ids" : {
      "isrc" : "GBK3W1700533"
    },
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/6VKX7rGnHoHJ4bECP12OOG"
    },
    "href" : "https://api.spotify.com/v1/tracks/6VKX7rGnHoHJ4bECP12OOG",
    "id" : "6VKX7rGnHoHJ4bECP12OOG",
    "is_playable" : true,
    "name" : "By Your Side",
    "popularity" : 58,
    "preview_url" : "https://p.scdn.co/mp3-preview/7c6c942b897efb491b94c7bce0129e81a9f5993a",
    "track_number" : 1,
    "type" : "track",
    "uri" : "spotify:track:6VKX7rGnHoHJ4bECP12OOG"
  }, {
    "album" : {
      "album_type" : "SINGLE",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/album/2CKXdpeHoMlDqTejLWjUZv"
      },
      "href" : "https://api.spotify.com/v1/albums/2CKXdpeHoMlDqTejLWjUZv",
      "id" : "2CKXdpeHoMlDqTejLWjUZv",
      "images" : [ {
        "height" : 640,
        "url" : "https://i.scdn.co/image/4bc845e5bb1468d83d989b672bc9144d56ff0c99",
        "width" : 640
      }, {
        "height" : 300,
        "url" : "https://i.scdn.co/image/a33bdc4e61f56df06923f8a3b963ff0c3fa40117",
        "width" : 300
      }, {
        "height" : 64,
        "url" : "https://i.scdn.co/image/eab846041e5676ecba0c539df1f400c6908767a0",
        "width" : 64
      } ],
      "name" : "Beautifully Unconventional",
      "type" : "album",
      "uri" : "spotify:album:2CKXdpeHoMlDqTejLWjUZv"
    },
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/3btzEQD6sugImIHPMRgkwV"
      },
      "href" : "https://api.spotify.com/v1/artists/3btzEQD6sugImIHPMRgkwV",
      "id" : "3btzEQD6sugImIHPMRgkwV",
      "name" : "Wolf Alice",
      "type" : "artist",
      "uri" : "spotify:artist:3btzEQD6sugImIHPMRgkwV"
    } ],
    "disc_number" : 1,
    "duration_ms" : 133160,
    "explicit" : false,
    "external_ids" : {
      "isrc" : "GBK3W1700560"
    },
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/0xnW2OIE2dSTTq3pl4l0BG"
    },
    "href" : "https://api.spotify.com/v1/tracks/0xnW2OIE2dSTTq3pl4l0BG",
    "id" : "0xnW2OIE2dSTTq3pl4l0BG",
    "is_playable" : true,
    "name" : "Beautifully Unconventional",
    "popularity" : 43,
    "preview_url" : "https://p.scdn.co/mp3-preview/3f8a6b359f41b252f6a616f77b9fff72d1376d36",
    "track_number" : 1,
    "type" : "track",
    "uri" : "spotify:track:0xnW2OIE2dSTTq3pl4l0BG"
  }, {
    "album" : {
      "album_type" : "ALBUM",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/album/0CuR6Mppen7l6GRFwzNJbl"
      },
      "href" : "https://api.spotify.com/v1/albums/0CuR6Mppen7l6GRFwzNJbl",
      "id" : "0CuR6Mppen7l6GRFwzNJbl",
      "images" : [ {
        "height" : 640,
        "url" : "https://i.scdn.co/image/bf91581885676f454c3ffc0e6bbc68c8525cb354",
        "width" : 640
      }, {
        "height" : 300,
        "url" : "https://i.scdn.co/image/72a2bcf0351252e52e7b8e8afced70e399bdcdea",
        "width" : 300
      }, {
        "height" : 64,
        "url" : "https://i.scdn.co/image/2f966fc7ff5e9fe5ea777c59361838070cd4b25d",
        "width" : 64
      } ],
      "name" : "Science Fiction",
      "type" : "album",
      "uri" : "spotify:album:0CuR6Mppen7l6GRFwzNJbl"
    },
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/168dgYui7ExaU612eooDF1"
      },
      "href" : "https://api.spotify.com/v1/artists/168dgYui7ExaU612eooDF1",
      "id" : "168dgYui7ExaU612eooDF1",
      "name" : "Brand New",
      "type" : "artist",
      "uri" : "spotify:artist:168dgYui7ExaU612eooDF1"
    } ],
    "disc_number" : 1,
    "duration_ms" : 376960,
    "explicit" : false,
    "external_ids" : {
      "isrc" : "QM4U61700901"
    },
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/5zlVZicMhDEwsZPmnccbSe"
    },
    "href" : "https://api.spotify.com/v1/tracks/5zlVZicMhDEwsZPmnccbSe",
    "id" : "5zlVZicMhDEwsZPmnccbSe",
    "is_playable" : true,
    "name" : "Lit Me Up",
    "popularity" : 61,
    "preview_url" : "https://p.scdn.co/mp3-preview/d90c7853b1fc8395bd160a6cb5c46e20b6f63c24",
    "track_number" : 1,
    "type" : "track",
    "uri" : "spotify:track:5zlVZicMhDEwsZPmnccbSe"
  }, {
    "album" : {
      "album_type" : "ALBUM",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/album/6oPAq3tPMGIvlpjoscQP4g"
      },
      "href" : "https://api.spotify.com/v1/albums/6oPAq3tPMGIvlpjoscQP4g",
      "id" : "6oPAq3tPMGIvlpjoscQP4g",
      "images" : [ {
        "height" : 640,
        "url" : "https://i.scdn.co/image/db72122ec0980c17849d59b90d8f5e04d0443bed",
        "width" : 640
      }, {
        "height" : 300,
        "url" : "https://i.scdn.co/image/6fd56e2a8cffaf3d782bdd32ceb02526f06903a3",
        "width" : 300
      }, {
        "height" : 64,
        "url" : "https://i.scdn.co/image/436936a508c47dcc45b72a1803f3245c1308fc5d",
        "width" : 64
      } ],
      "name" : "Hug Of Thunder",
      "type" : "album",
      "uri" : "spotify:album:6oPAq3tPMGIvlpjoscQP4g"
    },
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/7lOJ7WXyopaxri0dbOiZkd"
      },
      "href" : "https://api.spotify.com/v1/artists/7lOJ7WXyopaxri0dbOiZkd",
      "id" : "7lOJ7WXyopaxri0dbOiZkd",
      "name" : "Broken Social Scene",
      "type" : "artist",
      "uri" : "spotify:artist:7lOJ7WXyopaxri0dbOiZkd"
    } ],
    "disc_number" : 1,
    "duration_ms" : 293946,
    "explicit" : false,
    "external_ids" : {
      "isrc" : "CAAA11713510"
    },
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/0McfkA3LyYRtLdoQODr3jS"
    },
    "href" : "https://api.spotify.com/v1/tracks/0McfkA3LyYRtLdoQODr3jS",
    "id" : "0McfkA3LyYRtLdoQODr3jS",
    "is_playable" : true,
    "name" : "Please Take Me With You",
    "popularity" : 43,
    "preview_url" : "https://p.scdn.co/mp3-preview/b02b0b7bebe84b704c3ec0ab1484e12b47b15aa2",
    "track_number" : 10,
    "type" : "track",
    "uri" : "spotify:track:0McfkA3LyYRtLdoQODr3jS"
  } ],
  "total" : 1535,
  "limit" : 5,
  "offset" : 0,
  "previous" : null,
  "href" : "https://api.spotify.com/v1/me/top/tracks?limit=5&offset=0",
  "next" : "https://api.spotify.com/v1/me/top/tracks?limit=5&offset=5"
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
parseTracks(tracks)

//assume we have the data

function parseTracks(tracks) {
   // STAGE 1: what tracks and artists aren't already in database?
   let tracksToAdd = []
   let artistsToAdd = []
   let i = 1
   tracks.items.forEach((track, index) => {
      let cleanTrack = {
         temp_id: i,
         track_name: track.name,
         spotify_id: track.id,
         image_urls: {
            large: track.album.images[0].url,
            medium: track.album.images[1].url,
            small: track.album.images[2].url
         }
      }
      let cleanArtist = {
         temp_id: i,
         artist_name: track.artists[0].name,
         spotify_id: track.artists[0].id
      }
      let trackInDB = false
      let artistInDB = false


      getTrackBySpotifyID(cleanTrack.spotify_id, function(found, response) {
         if (!found) {
            console.log('track not found. add to db')
            tracksToAdd.push(cleanTrack)
         }
         if (index === tracks.items.length - 1) {
            // API request for additional track information
            console.log(tracksToAdd)
         }
      })

      getArtistBySpotifyID(cleanArtist.spotify_id, function (found, response) {
         if (!found) {
            console.log('artist not found. add to db')
            artistsToAdd.push(cleanArtist)
         }
         if (index === tracks.items.length - 1) {
            // API request for additional artist information
            console.log(artistsToAdd)
         }
      })

   i++

   })


}







knex.destroy()

