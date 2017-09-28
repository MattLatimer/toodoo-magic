
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('categories')
        ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('categories')
        ])
};
