
const express = require('express');
const next = require('next');
const helpers = require('./helpers.js');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const db = require('./models');

let routeObj;

app.prepare()
  .then(() => {
    const server = express();
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

    // redraw accepts a string of points, ie: -122.42,37.78;-122.45,37.91;-122.48,37.73
    // first is the start, last is the destination, and waypoints inbetween
    // each point separated by a semicolon except the last point (destination)
    server.get('/redraw', (req, res) => {
      const points = req.query.points;
      helpers.redrawRoute(points, (newRoute) => {
        routeObj = newRoute;
        res.send(newRoute);
      });
    });

    server.get('/mvpHack', (req, res) => {
      res.send(routeObj);
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
  