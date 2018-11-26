// const db = require('../models');
const express = require('express');

const signup = express.Router();

signup.post('/signup', (req, res) => {
  console.log(req.body);
  // check if email is already registered
  // if not create user, else send message that email is already registered
  // db.sequelize.models.user.findOne({
  //   where: {
  //     email: req.body.email,
  //   },
  //   raw: true,
  // }).then((user) => {
  //   if (user === null) {
  //     db.sequelize.models.user.create({
  //       username: 'test',
  //       email: req.body.email,
  //       password: req.body.password,
  //     });
  //   } else {
  //     res.send('email already registered');
  //   }
  // }).catch((err) => {
  //   console.log(err, 'err');
  // });
});

module.exports.signup = signup;
