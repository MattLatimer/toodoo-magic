exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        knex('categories').insert({title: 'To Watch'}),
        knex('categories').insert({title: 'To Read'}),
        knex('categories').insert({title: 'To Eat'}),
        knex('categories').insert({title: 'To Buy'}),
        knex('categories').insert({title: 'Uncategorized'})
      ]);
    });
};
