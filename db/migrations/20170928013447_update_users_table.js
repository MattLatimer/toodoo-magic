
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('users', function (table) {
            table.renameColumn('name', 'full_name');
            table.string('email');
            table.string('pw_hash');
            table.timestamp('created_at').defaultTo(knex.fn.now());         
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('users', function (table) {
            table.renameColumn('full_name', 'name');
            table.dropColumn('email');
            table.dropColumn('pw_hash');
            table.dropColumn('created_at');         
        })
    ])
};
