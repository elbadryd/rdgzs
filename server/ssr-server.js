
const express = require('express');
const next = require('next');
const uuid = require('uuid/v4');
const axios = require('axios');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const helpers = require('./helpers.js');


dotenv.config();

const users = [{
  id: '12345', email: 'me@me.com', password: 'password',
}];

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const db = require('./models');

const op = db.sequelize.Op;


app.prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    server.use(session({
      genid: () => uuid(),
      secret: process.env.SS,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 3600000 },
    }));

    server.use(passport.initialize());
    server.use(passport.session());

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
        db.sequelize.models.creds.findOne({
          where: {
            email,
            password,
          },
          raw: true,
        })
          .then((user) => {
            console.log(user, 'USER');
            if (!user) {
              done(null, false, { message: 'Incorrect email or password' });
            } else {
              done(null, user);
            }
          });
      },
    ));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
      console.log('deserializeUser', id);
      db.sequelize.models.user.findById(id, { raw: true })
        .then(user => done(null, user))
        .catch(error => done(error));
    });
    server.get('/createRoute', (req, res) => {
      console.log(req.query);
      const origin = JSON.parse(req.query.originCoords);
      const dest = JSON.parse(req.query.destCoords);
      const start = `${origin.lng},${origin.lat}`;
      const end = `${dest.lng},${dest.lat}`;
      console.log(end, start);
      helpers.makeTrip(start, end, 'context', (a, obj) => {
        console.log(obj);
        res.send(obj);
      });
    });

    server.post('/signup', (req, res) => {
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
          db.sequelize.models.user.create()
            .then(user => db.sequelize.models.creds.create({
              email: req.body.email,
              password: req.body.password,
              userId: user.id,
            })).catch((err) => {
              console.log(err, 'err');
            });
        } else {
          res.send('email already registered');
        }
      }).catch((err) => {
        console.log(err, 'err');
      });
      // db.sequelize.models.user.create({

      // })
    });

    server.get('/login', (req, res) => {
      console.log('GET /login');
      console.log(req.user);
    });

    server.post('/login', passport.authenticate('local'),
      (req, res) => {
        res.redirect('/start');
      });

    server.get('/logout', (req, res) => {
      console.log('logout hit');
      req.logout();
      res.redirect('/start');
    });

    server.get('/', (req, res) => {
      db.sequelize.query('select * from users where id = 1', 'GET /')
        .then((user) => {
          console.log(user[0][0]);
        });
      res.send(`bazinga id: ${req.sessionID}`);
    });

    server.post('/test', (req, res) => {
      const title = 'thisisatest';
      db.sequelize.query(`INSERT INTO todoitems (content) VALUES ('${title}')`);
      res.end();
    });

    server.get('/test', (req, res) => {
      db.sequelize.query('select * from todoitems')
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          res.send(err);
        });
    });

    server.get('*', (req, res) => handle(req, res));
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
