let user1 = {
  display_name: "ExampleUser1",
  spotify_id: "ex1",
  image_urls: {
    image: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/5418_1048965638480046_5792373902737592201_n.jpg?oh=a7efc6820caaa05da0878c3cce749114&oe=5A7F413F'
  },
  following: {
    following_array: [2]
  }
}

let user2 = {
  display_name: "ExampleUser2",
  spotify_id: "ex2",
  image_urls: {
    image: 'https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/13775793_10153610171132687_1785877468594627692_n.jpg?oh=1c88fcbb62a8d746c544b6bbed9b8f9e&oe=5A775134'
  },
  following: {
    following_array: [1]
  }
}


let track1 = {
  track_name: "track1",
  spotify_id: "1234",
  image_urls: {
    large: 'https://i.scdn.co/image/c429243cd056974175abe72a3142d3dccffc166a',
    medium: 'https://i.scdn.co/image/31327f9fe6b6e0bd6e431a4add681397e95c6329',
    small: 'https://i.scdn.co/image/15fed5371098fbf631193332164fba1d0e08c878',
  },
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

let track2 = {
  track_name: "track2",
  spotify_id: "3Kf",
  image_urls: {
    large: 'https://i.scdn.co/image/e26910fd9e7bb1671213cb9ed06a855077ddd79f',
    medium: 'https://i.scdn.co/image/7da8f3c2b2e002853864b6986f78e8cb7933d020',
    small: 'https://i.scdn.co/image/fc4fe9ac0aa200c5af2bf26d791fad09dbc059e2',
  },
  danceability: 0.688,
  energy: 0.435,
  key: 9,
  loudness: -11.359,
  mode: 1,
  speechiness: 0.0323,
  acousticness: 0.449,
  instrumentalness: 0,
  liveness: 0.113,
  valence: 0.410,
  tempo: 103.239
}


let track3 = {
  track_name: "track3",
  spotify_id: "2Agnbuzvn",
  image_urls: {
    large: 'https://i.scdn.co/image/717290460ec646ffa372c7f483835eaacfea34f7',
    medium: 'https://i.scdn.co/image/4df3b334d17428ba101ac867e6f97a0196af1635',
    small: 'https://i.scdn.co/image/374221d6e309c5cb5e180a8ba167a8ce70055c5b',
  },
  danceability: 0.456,
  energy: 0.609,
  key: 7,
  loudness: -6.439,
  mode: 0,
  speechiness: 0.377,
  acousticness: 0.617,
  instrumentalness: 0,
  liveness: 0.0724,
  valence: 0.407,
  tempo: 86.368
}


let track4 = {
  track_name: "track4",
  spotify_id: "4VZM7",
  image_urls: {
    large: 'https://i.scdn.co/image/3a3fc1256e0b30ebedd13dee5d3071744163cd63',
    medium: 'https://i.scdn.co/image/52abd9c07908386d56681b87a3c22b54bc904ed6',
    small: 'https://i.scdn.co/image/ddf6cf4e4e4306f371bd24814bb2400e9343851c',
  },
  danceability: 0.304,
  energy: 0.229,
  key: 4,
  loudness: -14.678,
  mode: 1,
  speechiness: 0.0330,
  acousticness: 0.971,
  instrumentalness: 0.408,
  liveness: 0.109,
  valence: 0.150,
  tempo: 80.118
}


let track5 = {
  track_name: "track5",
  spotify_id: "6nRen",
  image_urls: {
    large: 'https://i.scdn.co/image/732d604860b0dbeb652d6a4bc4e10531a15f5310',
    medium: 'https://i.scdn.co/image/a7156e9d16b0da604d15ccd08c136236edb1e30c',
    small: 'https://i.scdn.co/image/d58d786107bbc5a7fe6b876eb74d364b05b1bd80',
  },
  danceability: 0.634,
  energy: 0.404,
  key: 0,
  loudness: -10.450,
  mode: 1,
  speechiness: 0.0287,
  acousticness: 0.492,
  instrumentalness: 0.0110,
  liveness: 0.125,
  valence: 0.592,
  tempo: 118.868
}


let artist1 = {
  artist_name: "artist1",
  spotify_id: "3WrFJ7",
  image_urls: {
    large: "https://i.scdn.co/image/197cff807611777427c93258f0a1ccdf6b013b09",
    medium: "https://i.scdn.co/image/2a80bb1f1da720b80ce29e7eff73a0b13d6a5c88",
    small: "https://i.scdn.co/image/b7d99ec41485c47e8cfc0401de182b948b5f9d49"
  },
  genres: {
    genres_array: [ "british invasion", "classic rock", "merseybeat", "protopunk", "psychedelic rock", "rock" ]
  }
}

let artist2 = {
  artist_name: "artist2",
  spotify_id: "1anyVhU62p",
  image_urls: {
    large: "https://i.scdn.co/image/f5aceffb43876273fa72b7c3c002d7e3218075fd",
    medium: "https://i.scdn.co/image/5e4a5edf6132eb41bc71dd04cc9c92f30e256171",
    small: "https://i.scdn.co/image/ff31d16413f7b9d6385947f81532f54c83128592"
  },
  genres: {
    genres_array: [ "pop rap", "rap" ]
  }
}

let artist3 = {
  artist_name: "artist3",
  spotify_id: "4LEiUm",
  image_urls: {
    large: "https://i.scdn.co/image/e759e8e517c8936035d6fb8a7535286937cf4e23",
    medium: "https://i.scdn.co/image/0739e045db56b6d047c6b34063ff4e3aca21b4a0",
    small: "https://i.scdn.co/image/fb146ca5e799d8feb3040eddfd52464c09cb4f96"
  },
  genres: {
    genres_array: [ "chamber pop", "folk-pop", "indie folk", "indie pop", "indie rock", "melancholia", "modern rock", "neo mellow", "slow core", "stomp and holler" ]
  }
}

let artist4 = {
  artist_name: "artist4",
  spotify_id: "4M5nC",
  image_urls: {
    large: "https://i.scdn.co/image/d1747efbc1b7c82865ba4c45ec1e9524d84d1f2b",
    medium: "https://i.scdn.co/image/efc2832c6777956982bb89a1940000800a8d6ff6",
    small: "https://i.scdn.co/image/6164c03430c6a0f931ab96dfd6bdb4d7e50ec0e3"
  },
  genres: {
    genres_array: [ "acoustic pop", "chamber pop", "folk-pop", "indie folk", "indie pop", "indie rock", "modern rock", "neo mellow", "new americana", "singer-songwriter", "stomp and holler" ]
  }
}

let playlist1 = {
  playlist_name: "playlist1",
  spotify_playlist_id: "4oL6Cn",
  spotify_owner_id: 1
}

let playlist2 = {
  playlist_name: "playlist2",
  spotify_playlist_id: "6Erx",
  spotify_owner_id: 2
}

let artist_tracks1 = {
  artist_id: 1,
  track_id: 1
}

let artist_tracks2 = {
  artist_id: 1,
  track_id: 2
}

let artist_tracks3 = {
  artist_id: 2,
  track_id: 3
}

let artist_tracks4 = {
  artist_id: 3,
  track_id: 4
}

let artist_tracks5 = {
  artist_id: 4,
  track_id: 5
}



let user_tracks1 = {
  user_id: 1,
  track_id: 1
}

let user_tracks2 = {
  user_id: 2,
  track_id: 1
}

let user_tracks3 = {
  user_id: 2,
  track_id: 2
}

let user_tracks4 = {
  user_id: 1,
  track_id: 3
}

let user_tracks5 = {
  user_id: 1,
  track_id: 4
}

let user_tracks6 = {
  user_id: 2,
  track_id: 4
}

let user_tracks7 = {
  user_id: 2,
  track_id: 5
}



let absolute_artist1 = {
  artist_name: "abs1",
  genres: {
    genres_array: [ "rock", "new wave" ]
  }
}

let absolute_artist2 = {
  artist_name: "abs2",
  genres: {
    genres_array: [ "classic rock", "rock" ]
  }
}


let user_absolute_artist1 = {
  user_id: 1,
  absolute_artist_id: 1
}

let user_absolute_artist2 = {
  user_id: 2,
  absolute_artist_id: 2
}

let user_absolute_artist3 = {
  user_id: 2,
  absolute_artist_id: 1
}




exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('user_absolute_artists').del(),
    knex('user_tracks').del(),
    knex('artist_tracks').del(),
    knex('absolute_artists').del(),
    knex('playlists').del(),
    knex('users').del(),
    knex('tracks').del(),
    knex('artists').del()
    ])
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('users').insert(user1),
        knex('users').insert(user2),

        knex('tracks').insert(track1),
        knex('tracks').insert(track2),
        knex('tracks').insert(track3),
        knex('tracks').insert(track4),
        knex('tracks').insert(track5),

        knex('artists').insert(artist1),
        knex('artists').insert(artist2),
        knex('artists').insert(artist3),
        knex('artists').insert(artist4),

        knex('playlists').insert(playlist1),
        knex('playlists').insert(playlist2),

        knex('absolute_artists').insert(absolute_artist1),
        knex('absolute_artists').insert(absolute_artist2),

        knex('artist_tracks').insert(artist_tracks1),
        knex('artist_tracks').insert(artist_tracks2),
        knex('artist_tracks').insert(artist_tracks3),
        knex('artist_tracks').insert(artist_tracks4),
        knex('artist_tracks').insert(artist_tracks5),

        knex('user_tracks').insert(user_tracks1),
        knex('user_tracks').insert(user_tracks2),
        knex('user_tracks').insert(user_tracks3),
        knex('user_tracks').insert(user_tracks4),
        knex('user_tracks').insert(user_tracks5),
        knex('user_tracks').insert(user_tracks6),
        knex('user_tracks').insert(user_tracks7),

        knex('user_absolute_artists').insert(user_absolute_artist1),
        knex('user_absolute_artists').insert(user_absolute_artist2),
        knex('user_absolute_artists').insert(user_absolute_artist3),

        ]);
    });
};
