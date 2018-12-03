const bcrypt = require('bcrypt');
// require passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// require session
const session = require('express-session');
const uuid = require('uuid/v4');
const dotenv = require('dotenv');
const SpotifyStrategy = require('passport-spotify').Strategy;
const db = require('../models');

dotenv.config();


module.exports = (app) => {
  app.use(session({
    genid: req => uuid(),
    secret: process.env.SS,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => {
    // console.log('deserializeUser', id);
    db.sequelize.models.user.findById(user.id, { raw: true })
      .then(user => done(null, user))
      .catch(error => done(error));
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      console.log('passport hit', email, password);
      db.sequelize.models.creds.findOne({
        where: {
          email,
        },
        raw: true,
      })
        .then((user) => {
          if (!user) {
            done(new Error('wrong creds, try again'));
          }

          const hashed = bcrypt.hashSync(password, user.salt);
          if (user.password === hashed) {
            return done(null, user);
          }

          return done(null, false, {
            message: 'Incorrect credentials.',
          });
        })
        .catch((err) => {
          console.error(err);
          done(null, false, {
            message: 'failed',
          });
        });
    },
  ));

  passport.use(new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      callbackURL: 'http://localhost:3000/login/callback',
    },
    ((req, accessToken, refreshToken, expires_in, profile, done) => {
      // asynchronous verification, for effect...
      console.log(accessToken, '!!!!!!!!!!!!!!!!!!!', refreshToken, expires_in, profile, 'SPOTIFY PROFILE');
      process.nextTick(() => {
        // To keep the example simple, the user's spotify profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the spotify account with a user record in your database,
        // and return that user instead.
        return done(null, req.user);
      });
    }),
  ));
};
