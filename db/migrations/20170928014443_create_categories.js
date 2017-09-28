
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('categories', function (table) {
            table.increments();
            table.string('title');
            table.timestamp('created_at').defaultTo(knex.fn.now());         
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('categories')
    ])
};
