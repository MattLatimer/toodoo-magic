"use strict";

const express = require('express');
const router  = express.Router();

// localhost:8080/items/
/*need to add middleware for user id and plug into all router */

module.exports = (knex) => {
  // Helper functions
  // getKeyword: returns one of the four keywords OR the entire string which was passed in
  function getKeyword(str) {
    const words = str.split(' ');
    const wLen = words.length - 1;
    if (words[0] === 'eat' || words[0] === 'watch' || words[0] === 'read' || words[0] === 'buy') {
      return words[0];
    } else if (words[wLen] === 'eat' || words[wLen] === 'watch' || words[wLen] === 'read' || words[wLen] === 'buy') {
      return words[wLen];
    } else {
      return str;
    }
  }

  router.get("/", (req, res) => {
    knex.select('id', 'content', 'categories_id')
      .from('items')
      .where('items.users_id', req.session.user_id)
      .then((rows)=>{
        res.json(rows);
      })
      .catch((err) => {
        console.log('error GET /items', err);
      });
  });


  router.post("/", (req, res) => {
    const keyword = getKeyword(req.body.itemContent);

    knex('keywords').select('categories_id').where('key', keyword).asCallback((err, result) => {
      if (err) {
        console.log('Error finding category from keyword');
        throw err;
      } else {
        if (result.length === 0) {
          res.locals.category = 5;
        } else {
          res.locals.category = result[0]['categories_id'];
        }
        console.log('Category is:', res.locals.category);
        res.locals.userid = req.session.user_id;
        knex('items').insert([{categories_id: res.locals.category, content: req.body.itemContent, users_id: res.locals.userid}])
          .returning(['id', 'content', 'categories_id']).asCallback((err, result) => {
            if (err) {
              throw err;
            } else {
              console.log(result);
              knex('items').where('id', result[0].id)
                .then(res.status(201).send(result));
            }
          });
      }
    });
    // knex('id', 'content', 'categories_id').from('items').where('user_id')
    // const { itemContent, catid, userid } = req.body;
    // console.log(`${itemContent}, ${catid}, ${userid}`);
  });

  router.delete("/:itemId", (req, res) => {
    //DELETE FUNCTION//
    const userId = req.session.user_id;
    const itemId = req.params.itemId;
    console.log("my values ",userId, itemId);
    //console.log (res.locals.user_id, itemId);
    knex('items')
    .where ("users_id", userId)
    .andWhere("id",itemId)
    .del()
    .then((count)=>{
      res.send({result:true});
    })
    .catch((err) => {
      console.log('error delete /:itemsId', err);
    });
    // response = knex.select('content', 'categories.title').from('items').join('categories').on(items.categories_id = categories.id).where(items.users_id = '1')
    // knex
    // delete from items table
  });

  router.put("/:itemId", (req, res) => {
    const itemId = req.params.itemId;
    const content = req.body.content;
    const categoryId = req.body.categoryId;
    const userId = req.session.user_id;
    knex('items').where({'id': itemId, 'users_id': userId})
      .update({'content': content, 'categories_id': categoryId});
  });

  router.get("/edit/:itemId", (req, res) => {
    res.locals.itemId = req.params.itemId;
    res.locals.userId = req.session.user_id;
    console.log("User and Item:", res.locals.userId, res.locals.itemId);
    knex('items').select('content', 'categories_id').where({'id': res.locals.itemId, 'users_id': res.locals.userId})
      .then((result) => {
        if (result.length) {
          console.log("Then result:", result);
          res.locals.content = result[0]['content'];
          res.locals.categoryId = result[0]["categories_id"];
          res.render("edit");
        } else {
          res.status(401).send("You have no item here.");
        }
      });
  });

  return router;
};

