const express = require('express');
const db = require('../models');

const signup = express.Router();

signup.post('/', (req, res) => {
  // console.log(req.body);
  // // check if email is already registered
  // // if not create user, else send message that email is already registered
  // db.sequelize.models.creds.findOne({
  //   where: {
  //     email: req.body.email,
  //   },
  //   raw: true,
  // }).then((user) => {
  //   if (user === null) {
  //     return db.sequelize.models.user.create({
  //       username: 'test',
  //       email: req.body.email,
  //       password: req.body.password,
  //     });
  //   }
  //   return res.send('email already registered');
  // }).catch((err) => {
  //   console.log(err, 'err');
  // });
});

module.exports.signupRouter = signup;
