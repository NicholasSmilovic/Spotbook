exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('absolute_artists', function(table){
      table.string('spotify_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('absolute_artists', function(table){
      table.dropColumn('spotify_id');
    })
  ])
};
