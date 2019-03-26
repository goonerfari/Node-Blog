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
      connection: 'postgres://ahfudvwwohmqop:dd37ebe855222ebb34ff9171962796f4f3749d6fee49e3068b931705080359ae@ec2-107-20-177-161.compute-1.amazonaws.com:5432/d93mn6vlglap7k',
      database: 'd93mn6vlglap7k',
      user:     'ahfudvwwohmqop',
      password: 'dd37ebe855222ebb34ff9171962796f4f3749d6fee49e3068b931705080359ae'
    },
    // connection: process.env.DATABASE_URL,
    migrations: {
        directory: __dirname + '/data/migrations',
    },
    seeds: {
        directory: __dirname + '/data/seeds/',
    },
},
};
