"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');

// localhost:8080/

module.exports = (knex) => {

  router.get("/", (req, res) => {
    if(req.session.user_id) {
      res.render("index");
    } 
    res.redirect('login');
  });
  
  
  
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
    
  function add(email, password, name) {
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
            pw_hash: passwordDigest,
            full_name: name
          })
            .returning('id');
        })
    );
  }
      
  router.get("/login", (req, res) => {
    res.locals.error = '';
    res.render("login");
  });
      
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
      
  router.post("/register", (req, res) => {
    let email = req.body.email;
    let pw = req.body.password;
    let name = req.body.name;
    add(email, pw, name).then((result) => {
      console.log(result);
      if (result != undefined){
      let id = result[0];
      req.session.user_id = id;
      console.log("You have created your account and been logged in.");
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




  router.get("/register", (req, res) => {
    res.render("register");
  });

  router.get("/logout", (req, res) => {
    req.session.user_id = null;
    res.locals.user_id = undefined;
    res.redirect("/login");
    console.log("redirected!");
  });

  return router;
};
