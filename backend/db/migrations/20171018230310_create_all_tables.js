
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary().unsigned();
      table.string('display_name');
      table.string('spotify_id');
      table.json('image_urls');
      table.timestamps();
    }),
    knex.schema.createTable('tracks', function (table) {
      table.increments('id').primary().unsigned();
      table.string('track_name');
      table.string('spotify_id');
      table.json('image_urls')
      table.float('dancebility');
      table.float('energy');
      table.float('key');
      table.float('loudness');
      table.float('mode');
      table.float('speechiness');
      table.float('acousticness');
      table.float('instrumentalness');
      table.float('liveness');
      table.float('valence');
      table.float('tempo');
      table.timestamps();
    }),
    knex.schema.createTable('artists', function (table) {
      table.increments('id').primary().unsigned();
      table.string('artist_name');
      table.string('spotify_id');
      table.json('image_urls');
      table.json('genres');
      table.timestamps();
    }),
//below: only references the name/id of playlist, will request from Spotify API to get actual tracks on playlist
    knex.schema.createTable('playlists', function (table) {
      table.increments('id').primary().unsigned();
      table.string('playlist_name');
      table.integer('spotify_owner_id').unsigned().references('id').inTable('users');
      table.string('spotify_playlist_id');
      table.timestamps();
    }),
    knex.schema.createTable('users_tracks', function (table) {
      table.increments('id').primary().unsigned();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('track_id').unsigned().references('id').inTable('tracks');
      table.timestamps();
    }),
    knex.schema.createTable('artists_tracks', function (table) {
      table.increments('id').primary().unsigned();
      table.integer('artist_id').unsigned().references('id').inTable('artists');
      table.integer('track_id').unsigned().references('id').inTable('tracks');
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_tracks'),
    knex.schema.dropTable('artists_tracks'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('tracks'),
    knex.schema.dropTable('artists'),
    knex.schema.dropTable('playlists')
  ])
};
