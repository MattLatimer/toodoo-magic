"use strict";

const express = require('express');
const router  = express.Router();

// localhost:8080/items/

module.exports = (knex) => {
  router.get("/", (req, res) => {
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
    // knex
      // delete from items table
  });

  router.put("/:itemId", (req, res) => {
    // knex
      // update items table
  })

  return router;
}