exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(users) {
      users.increments();
      users
        .string('name', 255)
        .notNullable()
        .unique();
    })
    .createTable('categories', function(categories) {
      categories.increments();
      categories.string('name', 255).notNullable();  
    })
    .createTable('posts', function(posts) {
      posts.increments();
      posts.string('title', 255).notNullable();
      posts.string('body', 5000);
      posts.string('postMainImg', 255);
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
