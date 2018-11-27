const express = require('express');
const passport = require('passport');


const login = express.Router();


login.get('/', (req, res) => {
  console.log('GET /login');
  res.send({ user: req.user || null });
});

login.post('/', (req, res, next) => { 
  console.log(req.url);
  next();
}, passport.authenticate('local', {
}), (req, res) => {
  res.send({
    loggedIn: true,
  });
});

module.exports.loginRouter = login;

