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

  server.get('*', (req, res) => {
    // const parsedUrl = parse(req.url, true);
    // const { pathname, query = {} } = parsedUrl;
    // // const route = routes[pathname];
    
    // // if (route) {
    //   console.log(route, 'true');
    //   return app.render(req, res, route.page, query);
    // }
    return handler(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
})
// add .get for * with route handler

  .catch((ex) => {
    console.error(ex.stack, 'error in catch');
    process.exit(1);
  });

// how to expor?
