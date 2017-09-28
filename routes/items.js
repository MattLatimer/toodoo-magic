"use strict";

const express = require('express');
const router  = express.Router();

// localhost:8080/items/

module.exports = (knex) => {
  // Helper functions
  // getKeyword: returns one of the four keywords OR the entire string which was passed in
  function getKeyword(str) {
    for (const i = 0; i < str.length; i++) {
      if (str[i] === ' ') {
        const end = i;
        break;
      }
    }
    let verb = str.splice(0, end);
    if (verb === 'eat' || verb === 'watch' || verb === 'read' || verb === 'buy') {
      return verb;
    }
    else {
      for (const i = str.length - 1; i > 0; i--) {
        if (str[i] === ' ') {
          const start = i;
          break;
        }
      }
      verb = str.splice(start, str.length);
      if (verb === 'eat' || verb === 'watch' || verb === 'read' || verb === 'buy') {
        return verb;
      }
    }
    return str;
  }

  router.get("/", (req, res) => {
    // knex
      // retrieve from items table
  });

  router.post("/", (req, res) => {
    // const { itemContent, catid, userid } = req.body;
    // console.log(`${itemContent}, ${catid}, ${userid}`);
    knex('items').insert([{categories_id: req.body.catid, content: req.body.itemContent, users_id: req.body.userid}])
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