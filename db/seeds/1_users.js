exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({full_name: 'Alice', email: 'a@a.com', pw_hash: '1234'}),
        knex('users').insert({full_name: 'Bob', email: 'b@b.com', pw_hash: '1234'}),
        knex('users').insert({full_name: 'Charlie', email: 'c@c.com', pw_hash: '1234'}),
        knex('users').insert({full_name: 'Daisy', email: 'd@d.com', pw_hash: '1234'}),
        knex('users').insert({full_name: 'Ethan', email: 'e@e.com', pw_hash: '1234'}),
        knex('users').insert({full_name: 'Faye', email: 'f@f.com', pw_hash: '1234'})
      ]);
    });
};
