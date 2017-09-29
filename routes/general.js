"use strict";

const express = require('express');
const router  = express.Router();

// localhost:8080/

module.exports = (knex) => {

  router.get("/", (req, res) => {
    console.log("YOOOOO:", req.session.user_id);
    // render login page if not logged in
    // res.render("login");
    // else render app
    res.render("index");
  })

  router.post("/login", (req, res) => {
    req.session.user_id = req.body.user_id;
    console.log("heyyyyyy:", req.session.user_id);
    res.redirect("/");
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
