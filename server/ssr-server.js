
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
const db = require('./models/index.js');
const helpers = require('./helpers.js');

dotenv.config();

const users = [{
  id: '12345', email: 'me@me.com', password: 'password',
}];

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


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


    server.get('/createRoute', (req, res) => {
      const origin = JSON.parse(req.query.originCoords);
      const dest = JSON.parse(req.query.destCoords);
      const start = `${origin.lng}, ${origin.lat}`;
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
       //db.checkuser
        //if user creds in db req session regenerate && req.session.user = req.body.username
        //res send req.session
      //else res send false
      console.log('POST /login');
      console.log(req.body);
      res.sendStatus(200);
    });

    server.get('/', (req, res) => {
      console.log('callback func', db);
      console.log(req.session);
      console.log(req.sessionID);
      
      res.send(`bazinga id: ${req.sessionID}`);
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
