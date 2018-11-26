const express = require('express');
const passport = require('passport');

const login = express.Router();


login.get('/', (req, res) => {
  console.log('GET /login');
  res.send({ user: req.user || null });
});
login.post('/', passport.authenticate('local', {
  successRedirect: '/start',
  failureRedirect: '/forms/login',
}));

module.exports.loginRouter = login;
