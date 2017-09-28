exports.seed = function(knex, Promise) {
  return knex('keywords').del()
    .then(function () {
      return Promise.all([
        knex('keywords').insert({key: 'watch', categories_id: 'a@a.com'}),
        knex('keywords').insert({key: 'eat', categories_id: 'a@a.com'}),
        knex('keywords').insert({key: 'read', categories_id: 'a@a.com'}),
        knex('keywords').insert({key: 'buy', categories_id: 'a@a.com'}),        
        ]);
    });
}; 