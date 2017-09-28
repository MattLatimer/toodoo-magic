exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({content: 'watch Harry Potter', users_id: 1, categories_id: 1}),
        knex('items').insert({content: 'watch Game of Thrones', users_id: 2, categories_id: 1}),
        knex('items').insert({content: 'read Slaughterhouse Five', users_id: 1, categories_id: 2}),
        knex('items').insert({content: 'read Sirens of Titan', users_id: 2, categories_id: 2}),
        knex('items').insert({content: 'buy Rolex', users_id: 1, categories_id: 3}),
        knex('items').insert({content: 'buy Fidget spinner', users_id: 2, categories_id: 3}),
        knex('items').insert({content: 'eat potatoes', users_id: 1, categories_id: 4}),
        knex('items').insert({content: 'eat at Oakwood Bistro', users_id: 1, categories_id: 4})
      ]);
    });
};
