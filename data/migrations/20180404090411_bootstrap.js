exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(users) {
      users.increments();
      users
        .string('name')
        .notNullable()
        .unique();
    })
    .createTable('categories', function(categories) {
      categories.increments();
      categories.string('string').notNullable();

      
    })
    .createTable('posts', function(posts) {
      posts.increments();
      posts.string('title').notNullable();
      posts.string('body');
      posts.string('postMainImg');
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

    
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts').dropTableIfExists('users').dropTableIfExists('categories');
};
