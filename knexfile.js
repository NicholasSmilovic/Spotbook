require('dotenv').config()


module.exports = {

  development: {
    client: 'pg',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      // port     : process.env.DB_PORT,
      //ssl      : process.env.DB_PORT
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    }
  }
}
