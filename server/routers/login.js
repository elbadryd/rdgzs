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

login.get('/spotify', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private'],
  showDialog: true,
}),
  (req, res) => {
    console.log('/spotify hit');
    console.log(req.user);
    res.end();
  });

login.get('/callback', passport.authenticate('spotify', {
}), (req, res) => {
    console.log('/callback hit');
    console.log(req.user);
    res.send(req.user);
  }
);

// login.get(
//   '/callback',
//   passport.authenticate('spotify', { failureRedirect: '/login' }),
//   function (req, res) {
//     res.redirect('/');
//   }
// );

module.exports.loginRouter = login;
