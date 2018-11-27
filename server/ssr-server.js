const express = require('express');
const { parse } = require('url');
const next = require('next');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routers');
const setUpPassport = require('./passport');


dotenv.config();
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  setUpPassport(server);
  routes(server);

  server.get('*', handler);

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
})
  .catch((ex) => {
    console.error(ex.stack, 'error in catch');
    process.exit(1);
  });
