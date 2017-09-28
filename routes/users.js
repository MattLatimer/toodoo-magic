"use strict";

const express = require('express');
const router  = express.Router();

// localhost:8080/users/

module.exports = (knex) => {

  router.put("/:userId", (req, res) => {
    // knex
      // edit users table
  });

  return router;
}
