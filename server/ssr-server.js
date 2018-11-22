
const express = require('express');
const next = require('next');
const helpers = require('./helpers.js');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();





app.prepare()
  .then(() => {
    const server = express();
    server.get('/test', (req, res) => {
      res.send('stillgot it');
    });

    server.get('/', (req, res) => {
      res.send('bazinga');
    });

    server.get('*', (req, res) => handle(req, res));
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });

    // server.get('/forms/login', (req, res) => {
    //   res.send('this actually worked');
    // });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
