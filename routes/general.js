"use strict";

const express = require('express');
const router  = express.Router();

// localhost:8080/

module.exports = (knex) => {

  router.get("/", (req, res) => {
    console.log('req.session', req.session)
    // render login page if not logged in
    // res.render("login");
    // else render app
    res.render("index")
  });

  router.put("/login", (req, res) => {
    req.session =  { user_id: 1 };
    res.redirect("/")
  })

  router.post("/register", (req, res) => {
    // knex
      // send register info
  })

  router.get("/register", (req, res) => {
    res.render("register");
  })

  return router;
}
