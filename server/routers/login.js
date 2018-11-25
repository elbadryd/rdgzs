const express = require('express');
const passport = require('passport');

const login = express.Router();


login.get('/login', (req, res) => {
  console.log('GET /login');
  res.send({ user: req.user || null });
});

login.post('/login', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/forms/login',
}));

module.exports.login = login;
