exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.addColumn('users', function (table) {
        table.json('following')
      })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.removeColumn('users'), function (table) {
      table.dropColumn('following')
    }])

};