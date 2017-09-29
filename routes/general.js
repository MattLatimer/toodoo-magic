"use strict";

const express = require('express');
const router  = express.Router();

// localhost:8080/

module.exports = (knex) => {

  router.get("/", (req, res) => {
    // render login page if not logged in
    // res.render("login");
    // else render app
    res.render("index")
  });

  router.post("/login", (req, res) => {
    req.session.user_id = req.body.user_id;
    res.locals.user_id = req.body.user_id;
    // req.session = null;
    res.redirect("/");
    console.log("redirected!");
  })

  router.post("/register", (req, res) => {
    // knex
      // send register info
  })

  router.get("/register", (req, res) => {
    res.render("register");
  })

  router.get("/logout", (req, res) => {
    req.session.user_id = null;
    res.locals.user_id = undefined;
    // req.session = null;
    res.redirect("/");
    console.log("redirected!");
  })

  return router;
}
