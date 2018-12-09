
/*
 * This file handel all /api/user Routes
 *
 */

// Dependencies
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose')
const User = require('../models/users')


// Dummy Data just for testing
let users = [
  { 'id': 1, 'name': 'Hamandi', 'cool': false },
  { 'id': 2, 'name': 'Hamdon', 'cool': true },
];

router.get('/', (req, res) => {
  User.find().then(result => {
    res.send(result);
  }).catch(err => {
    res.status(400).send(err)
  })
})

// Getting information
router.get('/:id', (req, res) => {

  User.findById(req.params.id).then(result => {
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
    const user = new User({
      name: "hamandi",
      age: 24
    });

    user.save().then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })

    res.send('Done');
  // }
});

router.delete('/:id', (req, res) => {
  User.remove({ _id: req.params.id }).then(result => {
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
  User.update({ _id: req.params.id }, { $set: { name: req.body.name, age: req.body.age } })
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
