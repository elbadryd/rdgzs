const express = require('express');
const next = require('next');
;

const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
//const session = require('express-session');
// const passport = require('passport');
// const axios = require('axios');
// const LocalStrategy = require('passport-local').Strategy;
// const handle = app.getRequestHandler();
// const db = require('./models');
// const helpers = require('./helpers.js');

const bodyParser = require('body-parser');
const setUpRouters = require('./routers');
const setUpPassport = require('./passport');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

modulel.exports.server = (() => app.prepare()
  .then(() => {
    // options for config
    const server = express();
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    setUpRouters(server);
    setUpPassport(server);
    // server.use(session({
    //   genid: (req) => {
    //     return uuid();
    //   },
    //   secret: process.env.SS,
    //   resave: false,
    //   saveUninitialized: true,
    //   cookie: { maxAge: 3600000 },
    // }));
    // server.use(passport.initialize());
    // server.use(passport.session());

    // passport.use(new LocalStrategy(
    //   {
    //     usernameField: 'email',
    //     passwordField: 'password',
    //   },
    //   (email, password, done) => {
    //     // check db user for where user username === username
    //     // if email === dbemail && username === dbusername
    //     // email =  `"some email"; DROP DATABASE;`;
    //     console.log('passport hit', email, password);
    //     db.sequelize.models.user.findOne({
    //       where: {
    //         email,
    //         password,
    //       },
    //       raw: true,
    //     })
    //       .then((user) => {
    //         console.log(user, 'USER');
    //         if (!user) {
    //           done(new Error('wrong creds, try again'));
    //         } else {
    //           done(null, user);
    //         }
    //       });
    //   },
    // ));

    // passport.serializeUser((user, done) => done(null, user.id));
    // passport.deserializeUser((id, done) => {
    //   console.log('deserializeUser', id);
    //   db.sequelize.models.user.findById(id, { raw: true })
    //     .then(user => done(null, user))
    //     .catch(error => done(error));
    // });


    // server.get('/createRoute', (req, res) => {
    //   console.log(req.query);
    //   const origin = JSON.parse(req.query.originCoords);
    //   const dest = JSON.parse(req.query.destCoords);
    //   const start = `${origin.lng},${origin.lat}`;
    //   const end = `${dest.lng},${dest.lat}`;
    //   console.log(end, start);
    //   helpers.makeTrip(start, end, 'context', (a, obj) => {
    //     res.send(obj);
    //   });
    // });

    // server.post('/signup', (req, res) => {
    //   console.log(req.body);
    //   // check if email is already registered
    //   // if not create user, else send message that email is already registered
    //   db.sequelize.models.user.findOne({
    //     where: {
    //       email: req.body.email,
    //     },
    //     raw: true,
    //   }).then((user) => {
    //     if (user === null) {
    //       db.sequelize.models.user.create({
    //         username: 'test',
    //         email: req.body.email,
    //         password: req.body.password,
    //       });
    //     } else {
    //       res.send('email already registered');
    //     }
    //   }).catch((err) => {
    //     console.log(err, 'err');
    //   });
      // db.sequelize.models.user.create({

      // })
    // });

    // server.get('/login', (req, res) => {
    //   console.log('GET /login');
    //   console.log(req.user);
    // });
 
    // server.post('/login', passport.authenticate('local', {
    //   successRedirect: '/index',
    //   failureRedirect: '/forms/login',
    // }));

    // server.get('/', (req, res) => {
    //   db.sequelize.query('select * from users where id = 1')
    //     .then((user) => {
    //       console.log(user[0][0]);
    //     });
    //   res.send(`bazinga id: ${req.sessionID}`);
    // });

    // server.post('/test', (req, res) => {
    //   const title = 'thisisatest';
    //   db.sequelize.query(`INSERT INTO todoitems (content) VALUES ('${title}')`);
    //   res.end();
    // });

    // server.get('/test', (req, res) => {
    //   db.sequelize.query('select * from todoitems')
    //     .then((response) => {
    //       res.send(response);
    //     })
    //     .catch((err) => {
    //       res.send(err);
    //     });
    // });

    // redraw accepts a string of points, ie: -122.42,37.78;-122.45,37.91;-122.48,37.73
    // first is the start, last is the destination, and waypoints inbetween
    // each point separated by a semicolon except the last point (destination)
    // server.get('/redraw', (req, res) => {
    //   const points = req.query.points;
    //   helpers.redrawRoute(points, (newRoute) => {
    //     routeObj = newRoute;
    //     res.send(newRoute);
    //   });
    // });

    // server.get('*', (req, res) => handle(req, res));
    // server.listen(3000, (err) => {
    //   if (err) throw err;
    //   console.log('> Ready on http://localhost:3000');
    // });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });


// module.exports.server = server;
