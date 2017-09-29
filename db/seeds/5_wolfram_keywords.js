
exports.seed = function(knex, Promise) {
  return knex('wkeywords').del()
  .then(function () {
    return Promise.all([
      knex('wkeywords').insert({wkey: 'a fictional character', categories_id: '2'}),
      knex('wkeywords').insert({wkey: 'movies', categories_id: '1'}),
      knex('wkeywords').insert({wkey: 'finance', categories_id: '3'}),
      knex('wkeywords').insert({wkey: 'retail locations', categories_id: '3'}),
      knex('wkeywords').insert({wkey: 'music works', categories_id: '4'}),
      knex('wkeywords').insert({wkey: 'consumer products', categories_id: '4'}),
      knex('wkeywords').insert({wkey: 'food', categories_id: '3'}),
      knex('wkeywords').insert({wkey: 'books', categories_id: '2'}),
      knex('wkeywords').insert({wkey: 'a text', categories_id: '2'}),      
    ]);
  });
};
