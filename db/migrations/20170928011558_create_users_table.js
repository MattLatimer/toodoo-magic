
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function (table) {
            table.increments();
            table.string('full_name');
            table.string('email');
            table.string('pw_hash');
            table.timestamp('created_at').defaultTo(knex.fn.now());
          })
        ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users')
        ])
};
