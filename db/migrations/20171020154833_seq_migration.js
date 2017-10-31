
exports.up = (knex, Promise) => {
  return Promise.all([])
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.raw('ALTER SEQUENCE ' + 'artists_id_seq' + ' START WITH 1'),
    knex.raw('ALTER SEQUENCE ' + 'artists_id_seq' + ' RESTART WITH 1'),
    knex.raw('ALTER SEQUENCE ' + 'tracks_id_seq' + ' START WITH 1'),
    knex.raw('ALTER SEQUENCE ' + 'tracks_id_seq' + ' RESTART WITH 1'),
    knex.raw('ALTER SEQUENCE ' + 'playlists_id_seq' + ' START WITH 1'),
    knex.raw('ALTER SEQUENCE ' + 'playlists_id_seq' + ' RESTART WITH 1'),
    knex.raw('ALTER SEQUENCE ' + 'users_id_seq' + ' START WITH 1'),
    knex.raw('ALTER SEQUENCE ' + 'users_id_seq' + ' RESTART WITH 1')
    ])
};
