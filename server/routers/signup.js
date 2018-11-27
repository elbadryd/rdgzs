const bcrypt = require('bcrypt');
const express = require('express');
const db = require('../models');

const signup = express.Router();


signup.post('/', (req, res) => {
  console.log(req.body);
  // check if email is already registered
  // if not create user, else send message that email is already registered
  db.sequelize.models.creds.findOne({
    where: {
      email: req.body.email,
    },
    raw: true,
  }).then((creds) => {
    // if creds === null, create new user and pass
    if (creds === null) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      console.log(salt, 'SALT');
      db.sequelize.models.user.create()
        .then(user => db.sequelize.models.creds.create({
          email: req.body.email,
          password: hash,
          userId: user.id,
          salt: salt,
        })).catch((err) => {
          console.log(err, 'err');
        });
    } else {
      res.send('email already registered');
    }
  }).catch((err) => {
    console.log(err, 'err');
  });
});

module.exports.signupRouter = signup;
