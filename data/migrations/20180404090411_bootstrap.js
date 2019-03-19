exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(users) {
      users.increments();
      users
        .string('name')
        .notNullable()
        .unique();
    })
    .createTable('posts', function(posts) {
      posts.increments();
      posts.string('title').notNullable();
      posts.string('body').notNullable();
      posts.string('postMainImg').notNullable();
      posts
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      posts
        .integer('category_id')
        .unsigned()
        // .notNullable()
        .references('id')
        .inTable('categories');
    })

    .createTable('categories', function(categories) {
      categories.increments();
      categories.string('string').notNullable();

      
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts').dropTableIfExists('users').dropTableIfExists('categories');
};
