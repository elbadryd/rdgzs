
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

console.log(db.sequelize.models);

const op = db.sequelize.Op;


app.prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    server.use(session({
      genid: (req) => {
        console.log('session midware');
        console.log(req.sessionID);
        return uuid();
      },
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

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
      console.log('deserializeUser', id);
      db.sequelize.models.user.findById(id, { raw: true })
        .then(user => done(null, user))
        .catch(error => done(error));
    });
    server.get('/createRoute', (req, res) => {
      const origin = JSON.parse(req.query.originCoords);
      const dest = JSON.parse(req.query.destCoords);
      const start = `${origin.lng},${origin.lat}`;
      const end = `${dest.lng},${dest.lat}`;
      console.log(end, start);
      helpers.makeTrip(start, end, 'context', (a, obj) => {
        res.send(obj);
      });
    });

    server.get('/login', (req, res) => {
      console.log('GET /login');
      console.log(req.sessionID);
      console.log(req.user);
    });

    server.post('/login', passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login',
    }));

    server.get('/', (req, res) => {
      console.log('callback func');
      console.log(req.sessionID);
     

      db.sequelize.query('select * from users where id = 1')
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
