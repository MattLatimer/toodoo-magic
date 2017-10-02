"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');

// localhost:8080/user/

module.exports = (knex) => {

// GET existing user info from database then rendering profile on page otherwise redirect to login page//    
  router.get('/', (req, res) => {
    if (req.session.user_id) {
      knex('users').select('full_name', 'email').where('id', req.session.user_id)
        .then((result) => {
          console.log("GETTING USER:", result[0]);
          res.locals.fullName = (result[0]['full_name']) ? result[0]['full_name'] : "";
          res.locals.email = result[0]['email'];
          res.render('profile');
        });
    } else {
      res.redirect('login');
    }
  });

// PUT updating existing user info//     
  router.put("/", (req, res) => {
    if (req.session.user_id) {
      if (req.body.password) {
        bcrypt.hash(req.body.password, 10, (err, passhash) => {
          knex('users').update({
            full_name: req.body.name,
            email: req.body.email,
            pw_hash: passhash
          })
            .where('id', req.session.user_id)
            .then((result) => {
              res.redirect('/');
            });
        });
      } else {
        knex('users').update({
          full_name: req.body.name,
          email: req.body.email,
        })
          .where('id', req.session.user_id)
          .then((result) => {
            res.redirect('/');
          });
      }
    } else {
      res.redirect('login');
    }
  });

  return router;
};
