"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');

// localhost:8080/

module.exports = (knex) => {

// GET for main page that checks if user has signed in and if not redirects to login page//
  router.get("/", (req, res) => {
    if(req.session.user_id) {
      res.render("index");
    } 
    res.redirect('login');
  });
  
  
// Helper function passing an email checks whether the email is in the database//
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
    });
  }


// Helper function passing an email to check for uniqueness of email in the database, uses findByEmail function then rejects if the email is already in the database //
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
        .catch((email) => resolve(email));
    });
  }
    

// Helper function passing email, password and name then check the email uniqueness, hashes the password then add the new user information into the database//
  function add(email, password, name) {
    return (
      checkEmailUniqueness(email) 
        .then((email) => {
          return bcrypt.hash(password, 10);
        })
        .then((passwordDigest) => {
          return knex('users').insert({
            email: email,
            pw_hash: passwordDigest,
            full_name: name
          })
            .returning('id');
        })
    );
  }
 
// GET for /login//  
  router.get("/login", (req, res) => {
    res.locals.error = '';
    res.render("login");
  });
   
// POST for /login using findByEmail function to find entered email in the database, then bcrypt compare the password and the password entered then redirects to main page//
  router.post("/login", (req, res) => {
    findByEmail(req.body.email)
      .then((result) => {
        bcrypt.compare(req.body.password, result.pw_hash, (err, pwMatch) => {
          if (pwMatch) {
            req.session.user_id = result.id;
            res.redirect('/');
          } else {
            res.locals.error = "Bad credentials.";
            res.render("login");
          }
        });
      })
      .catch((error) => {
        res.locals.error = "Bad credentials.";
        res.render("login");
      });
  });

// POST for /register add the email,pw and name of the new user to the database after checking for unique user using the add function//
  router.post("/register", (req, res) => {
    let email = req.body.email;
    let pw = req.body.password;
    let name = req.body.name;
    add(email, pw, name).then((result) => {
      if (result != undefined){
      let id = result[0];
      req.session.user_id = id;
      res.status(200).send(result);
      }
      else {
      return(error);
      res.status(200);
      }
    })
    .catch((error) => { 
    console.log(error, "Unsuccessful Login.");
    res.status(400).send(error);
    })
      .catch((error) => {
        console.log(error, "Unsuccessful Login.");
        res.status(400).send(error);
      });
  });

// GET for /register//
  router.get("/register", (req, res) => {
    res.render("register");
  });

// GET for /logout that gets rid of session cookies// 
  router.get("/logout", (req, res) => {
    req.session.user_id = null;
    res.locals.user_id = undefined;
    res.redirect("/login");
  });

  return router;
};
