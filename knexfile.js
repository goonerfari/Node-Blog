module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/blog.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      database: 'd93mn6vlglap7k',
      user:     'ahfudvwwohmqop',
      password: 'dd37ebe855222ebb34ff9171962796f4f3749d6fee49e3068b931705080359ae'
    },
    // connection: process.env.DATABASE_URL,
    migrations: {
        directory: __dirname + '/dt/migrations',
    },
    seeds: {
        directory: __dirname + '/dt/seeds/',
    },
},
};
