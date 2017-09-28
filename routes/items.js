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
    const { itemContent, catid, userid } = req.body;
    console.log(`${itemContent}, ${catid}, ${userid}`);
    // knex('items').insert([{content: req.body.itemContent},
    //                       {categories_id: req.body.catid},
    //                       {users_id: req.body.userid}])
    //               .then(res => console.log("ressssss", res))
    res.status(201).send();
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