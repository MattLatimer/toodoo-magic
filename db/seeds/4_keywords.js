exports.seed = function(knex, Promise) {
  return knex('keywords').del()
    .then(function () {
      return Promise.all([
        knex('keywords').insert({key: 'watch', categories_id: '1'}),
        knex('keywords').insert({key: 'read', categories_id: '2'}),
        knex('keywords').insert({key: 'eat', categories_id: '3'}),
        knex('keywords').insert({key: 'buy', categories_id: '4'})
      ]);
    });
};