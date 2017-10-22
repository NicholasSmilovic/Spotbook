exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('absolute_artists', function (table) {
      table.increments('id').primary().unsigned();
      table.string('artist_name');
      table.json('genres');
      table.timestamps();
    }),
    knex.schema.createTable('user_absolute_artists', function (table) {
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('absolute_artist_id').unsigned().references('id').inTable('absolute_artists');
      table.primary(['user_id','absolute_artist_id'])
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('ALTER SEQUENCE ' + 'absolute_artists_id_seq' + ' START WITH 1'),
    knex.raw('ALTER SEQUENCE ' + 'absolute_artists_id_seq' + ' RESTART WITH 1'),
    knex.schema.dropTable('user_absolute_artists'),
    knex.schema.dropTable('absolute_artists')
  ])
};