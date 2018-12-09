// /*
//  * File that handel the posts routes
//  */

//  /*
//   * @TODO this file is not finished
//   *
//   */

// const express = require('express');
// const router = express.Router();
// const Joi = require('joi');


// let posts = [
//   {'id': 1 ,
//    'title': 'Hamandi',
//    'desc': false,
//    'numberOfLikes': 0
//   },
// ];



/*
 * This file handel all /api/user Routes
 *
 */

// Dependencies
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose')
const Posts = require('../models/posts')


// Dummy Data just for testing
let users = [
  { 'id': 1, 'name': 'Hamandi', 'cool': false },
  { 'id': 2, 'name': 'Hamdon', 'cool': true },
];

router.get('/', (req, res) => {
  Posts.find().then(result => {
    res.send(result);
  }).catch(err => {
    res.status(400).send(err)
  })
})

// Getting information
router.get('/:id', (req, res) => {

  Posts.findById(req.params.id).then(result => {
    if (!result) {
      res.status(404).send('there no such id');
    } else {
      res.send(result);
    }
  }).catch(err => {
    res.status(404).send(err);
  })

  // let user = users.find(item => item.id === parseInt(req.params.id));
  // if(user){

  // }else {

  // }
});


// Adding a new User
router.post('/', (req, res) => {
  // Setting Schema so i can validate it
  // const validating = userValidating(req.body);

  // if (validating.error) {
    // res.status(400).send(validating.error.details);
  // } else {
    const posts = new Posts({
      name: "hamandi",
      likes: 24,
      content:'lorem ipsum dolor amit'
    });

    posts.save().then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })

    res.send('Done');
  // }
});

router.delete('/:id', (req, res) => {
  Posts.remove({ _id: req.params.id }).then(result => {
    res.send(`number of deleted users is ${result.n}`)
  }).catch(err => {
    res.status(404).send(err.message);
  })
})


// PUT
router.put('/:id', (req, res) => {
  // Check if the user exist
  // let user = users.find(item => item.id === parseInt(req.params.id));
  // const validating = userValidating(req.body);

  // if (validating.error) {
  //  If the validation fails

  // if (validating.error) {
  //   res.status(400).send(validating.error.details);
  // } else {
    Posts.update({ _id: req.params.id }, { $set: { name: req.body.name, likes: req.body.likes } })
    .then(result => {
      res.send(result);

    }).catch(err => {
      res.status(404).send(err);
    })

  //  If the validation success
  // let newUser = {
  //   'id': user.id,
  //   'name': req.body.name,
  //   'cool': req.body.cool == 'true'
  // };

  // users[users.indexOf(user)] = newUser;

  // }}
});


//  To validate the POST PUT requestes
// function userValidating(user) {
//    const userSchema = {
//   //   // 'name': Joi.string().min(3).required(),
//   //   // 'age': Joi.number().required()  
// }
//   return Joi.validate(user, userSchema);
// }


//  Expoting the router so app.js can use it in a MiddleWare
module.exports = router;
