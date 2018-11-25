const express = require('express');
// require passport
const passport = require('passport');

const createRouter = express.Router();


createRouter.get('/login', (req, res) => {
  console.log('GET /login');
  res.send({ user: req.user || null });
});

createRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/index',
  failureRedirect: '/forms/login',
}));
