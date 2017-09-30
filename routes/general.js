"use strict";

const express = require('express');
const router  = express.Router();

// localhost:8080/

module.exports = (knex) => {

  router.get("/", (req, res) => {
    // render login page if not logged in
    // res.render("login");
    // else render app
    if(!res.locals.user_id) {
      res.render('register');
    }
    res.render("index");
  })

  router.get("/login", (req, res) => {
    req.session.user_id = 1;
    res.locals.user_id = 1;
    // req.session = null;
    console.log("redirected!");
    res.redirect("/");
  })

  router.post("/register", (req, res) => {

  })

  router.get("/register", (req, res) => {
    res.render("register");
  })

  router.get("/logout", (req, res) => {
    req.session.user_id = null;
    res.locals.user_id = undefined;
    // req.session = null;
    res.redirect("/register");
    console.log("redirected!");
  })

  return router;
}
