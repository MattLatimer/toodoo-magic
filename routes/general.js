"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');

// localhost:8080/

module.exports = (knex) => {

  router.get("/", (req, res) => {
    // render login page if not logged in
    // res.render("login");
    // else render app
    res.render("index");
  })

  router.get("/login", (req, res) => {
    req.session.user_id = 1;
    res.locals.user_id = 1;
    // req.session = null;
    console.log("redirected!");
    res.redirect("/");
  })



  function findByEmail(email) {
    return new Promise((resolve, reject) => {
      knex('users')
        .select('*')
        .where({ email: email })
        .limit(1)
        .then((rows) => {
          let user = rows[0];
          return (user) ? resolve(user) : reject(email);
        })
        .catch((error) => reject(error));
    })
  }

  function checkEmailUniqueness(email) {
    return new Promise((resolve, reject) => {
      findByEmail(email)
        .then((user) => {
          if (user) {
            return reject({
              type: 409,
              message: 'This email cannot be used.'
            });
          } else {
            return resolve(email);
          }
        })
        .catch((email) => resolve(email))
    })
  }

  function add(email, password) {
    return (
      checkEmailUniqueness(email) // First check if email already exists
        .then((email) => {
          console.log("Email is unique");
          return bcrypt.hash(password, 10);
        })
        .then((passwordDigest) => {
          console.log("Pw is hashed");
          return knex('users').insert({
            email: email,
            pw_hash: passwordDigest
          })
        .returning('id');
        })
        .catch((error) => console.log("function add rror:", error))
    )
  }



  router.post("/register", (req, res) => {
    let email = req.body.email;
    let pw = req.body.password;
    add(email, pw).then((result) => {
      let id = result[0];
      req.session.user_id = id;
      console.log("You have created your account and been logged in.");
      res.redirect('/');
    })
      .catch((error) => console.log(error, "Unsuccessful Login."))
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
