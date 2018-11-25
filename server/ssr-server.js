const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const setUpRouters = require('./routers');
const setUpPassport = require('./passport');


dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();


app.prepare()
  .then(() => {
    // options for config
    const server = express();
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    setUpRouters(server);
    setUpPassport(server);
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
  
// how to expor?
