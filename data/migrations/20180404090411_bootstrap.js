exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(users) {
      users.increments();
      users
        .text('name')
        .notNullable()
        .unique();
    })
    .createTable('categories', function(categories) {
      categories.increments();
      categories.text('name').notNullable();  
    })
    .createTable('posts', function(posts) {
      posts.increments();
      posts.text('title').notNullable();
      posts.text('body');
      posts.text('postMainImg');
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
