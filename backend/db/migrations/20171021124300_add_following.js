exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.json('following');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.dropColumn('following');
    })
  ])
};