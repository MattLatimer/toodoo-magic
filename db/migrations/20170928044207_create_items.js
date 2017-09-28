
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('items', function (table) {
            table.increments();
            table.string('content');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.integer('users_id').unsigned().references('id').inTable('users').notNull().onDelete('cascade');
            table.integer('categories_id').unsigned().references('id').inTable('categories').notNull().onDelete('cascade');            
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('items')
    ])
};
