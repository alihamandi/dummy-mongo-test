/*
 * Express Example
 */

// Dependencies
const express = require('express');
const app = express();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const hello =  require('./hello');
const usersRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const mongoose = require('mongoose');

//  Starting MongoDB connection
mongoose.connect('mongodb://ali hamandi:1234ab@ds052649.mlab.com:52649/myfirst-mongo-fikra',{useNewUrlParser: true }) ;

//  To Check if the connection works fine or not
mongoose.connection.on('connected', () => {
  console.log('mongo has been connected...');
});


// MiddleWare
app.use(express.json());
// Custom MiddleWare thats do nothing just to made the MiddleWare clear
app.use(hello);
// For serving images and other static data
app.use(express.static('public'));
// Custom MiddleWare
// app.use((req, res, next) => {
//   try {
//     let payload = jwt.verify(req.body.token, 'secret123');
//     res.send(payload);
//   } catch (err) {
//     res.status(400).send('invalid token');
//   }
//   res.send(v);
//   next();
// });

// Route MiddleWare
app.use('/api/user', usersRoutes);
app.use('/api/posts', postsRoutes);

// Home Router
// app.get('/', (req, res) => {
//   const token = jwt.sign({"name":"Hamdon", "age": 24}, 'key');
//   res.send(token);
// })

// Starting the server
app.listen(3000, () => {
  console.log('Running on port 3000');
});
