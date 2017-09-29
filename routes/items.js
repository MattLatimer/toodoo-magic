"use strict";

const express = require('express');
const router  = express.Router();

// localhost:8080/items/
/*need to add middleware for user id and plug into all router */

module.exports = (knex) => {
  // Helper functions
  // getKeyword: returns one of the four keywords OR the entire string which was passed in
  function getKeyword(str) {
    const words = str.split(' ');
    const wLen = words.length - 1;
    if (words[0] === 'eat' || words[0] === 'watch' || words[0] === 'read' || words[0] === 'buy') {
      return words[0];
    } else if (words[wLen] === 'eat' || words[wLen] === 'watch' || words[wLen] === 'read' || words[wLen] === 'buy') {
      return words[wLen];
    } else {
      return str;
    }
  }

  router.get("/", (req, res) => {
    knex.select('content', 'categories.title')
    .from('items')
    .join('categories', 'items.categories_id', 'categories.id')
    .where('items.users_id', '1')
    .then((rows)=>{ 
      res.json(rows)
    })
    .catch((err) => {
      console.log('error GET /items', err)
    })
    // knex
      // retrieve from items table
  });

  router.post("/", (req, res) => {
    const keyword = 'eat';

    knex('keywords').select('categories_id').where('key', keyword).asCallback((err, result) => {
      if (err) {
        console.log('Error finding category from keyword');
      } else {
        if (result.length === 0) {
          res.locals.category = 0;
        } else {
          res.locals.category = result[0]['categories_id'];
        }
        console.log('Category is:', res.locals.category);
      }
    });
    
    // const { itemContent, catid, userid } = req.body;
    // console.log(`${itemContent}, ${catid}, ${userid}`);
    knex('items').insert([{categories_id: res.locals.category, content: req.body.itemContent, users_id: req.body.userid}])
                 .then(res.status(201).send());
  });

  router.delete("/:itemId", (req, res) => {
    // response = knex.select('content', 'categories.title').from('items').join('categories').on(items.categories_id = categories.id).where(items.users_id = '1')
      // knex
      // delete from items table
  });

  router.put("/:itemId", (req, res) => {
    // knex
      // update items table
  })

  return router;
}