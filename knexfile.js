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
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: __dirname + '/data/migrations',
    },
    seeds: {
        directory: __dirname + '/data/seeds/production',
    },
},
};
