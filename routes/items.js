"use strict";

const express = require('express');
const router  = express.Router();

// localhost:8080/items/

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
      // retrieve from items table
  });

  router.post("/", (req, res) => {
    knex
      // add to items table
  });

  router.delete("/:itemId", (req, res) => {
    knex
      // delete from items table
  });

  router.put("/:itemId", (req, res) => {
    knex
      // update items table
  })

  return router;
}