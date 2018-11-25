const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const setUpRouters = require('./routers');
const setUpPassport = require('./passport');
const { PORT } = require('./config/config.json');


dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
  // options for config
  const server = express();
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  handle(server);
  setUpPassport(server);
  setUpRouters(server);

  server.get('*', handle);
  
  // (req, res) => {
  //   handle(req, res);
  // });
  server.listen(PORT, () => console.log('Server listening on %s', PORT));
})
// add .get for * with route handler

  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

// how to expor?
