const express = require('express');
const passport = require('passport');


const login = express.Router();


login.get('/', (req, res) => {
  console.log('GET /login');
  res.send({
    user: req.user || null,
  });
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

login.get('/spotify', passport.authorize('spotify', {
  scope: ['user-read-email', 'user-read-private', 'playlist-modify-public'],
  showDialog: true,
}),
(req, res) => {
  // console.log('/spotify hit');
  // console.log(req.user);
  res.end();
});

login.get('/callback', passport.authorize('spotify', {
}), (req, res) => {
  console.log('/callback hit');
  console.log(req.user);
  // const user = req.user;
  // const account = req.account;
  // account.userId = user.id;
  // account.save((err) => {
  //   if (err) { return self.error(err); }
  //   self.redirect('/');
  // });
  res.redirect('/');
});

module.exports.loginRouter = login;
