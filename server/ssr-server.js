
const express = require('express');
const next = require('next');
const helpers = require('./helpers.js');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const db = require('./models');

app.prepare()
  .then(() => {
    const server = express();
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
    server.post('/test', (req, res) => {
      const title = 'title';
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
