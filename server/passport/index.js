// require passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const uuid = require('uuid/v4');

// require session
const session = require('express-session');

// require databse
const db = require('../models');


module.exports = (app) => {
  app.use(session({
    genid: (req) => {
      return uuid();
    },
    secret: process.env.SS,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    console.log('deserializeUser', id);
    db.sequelize.models.user.findById(id, { raw: true })
      .then(user => done(null, user))
      .catch(error => done(error));
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      // check db user for where user username === username
      // if email === dbemail && username === dbusername
      // email =  `"some email"; DROP DATABASE;`;
      console.log('passport hit', email, password);
      db.sequelize.models.user.findOne({
        where: {
          email,
          password,
        },
        raw: true,
      })
        .then((user) => {
          console.log(user, 'USER');
          if (!user) {
            done(new Error('wrong creds, try again'));
          } else {
            done(null, user);
          }
        });
    },
  ));
};
