
const express = require('express');
const next = require('next');
const uuid = require('uuid/v4');
const axios = require('axios');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
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

passport.use(new LocalStrategy(
  (email, password, done) => {
    // check db user for where user username === username
    // if email === dbemail && username === dbusername
    db.sequelize.query(`select * from users where email = ${email}`)
      .then((user) => {
        if (user[0][0].email === email && user[0][0].password === password) {
          return done(null, user[0][0]);
        }
        return done(null, false, {
          message: 'ya done messed it up',
        });
      });
  },
));

passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .then(user => done(null, user))
//     .catch(error => done(error));
// });


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
    });

    server.post('/login', (req, res) => {
      passport.authenticate('local', {
        successFlash: 'you did it',
        failureFlash: 'almost there',
      });
      console.log('POST /login');
      console.log(req.body);
      res.sendStatus(200);
    });

    server.get('/', (req, res) => {
      console.log('callback func');
      console.log(req.sessionID);
      // user.findAll({
      //   where: {
      //     id: 1,
      //   },
      // }).then((user) => {
      //   console.log(user);
      // });

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
