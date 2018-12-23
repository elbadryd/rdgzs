const { loginRouter } = require('./login');
const { signupRouter } = require('./signup');
const { createRoute } = require('./createRoute');
const { redrawRouter } = require('./redraw');
const { stopRouter } = require('./stop');
const { tripRouter } = require('./trip');
const { logoutRouter } = require('./logout');
const { photoRouter } = require('./photo');
const { soundtrackRouter } = require('./soundtrack');
const { poiRouter } = require('./pois');
const { test } = require('./test');

module.exports = (app) => {
  app.use('/login', loginRouter);
  app.use('/logout', logoutRouter);
  app.use('/signup', signupRouter);
  app.use('/createRoute', createRoute);
  app.use('/redraw', redrawRouter);
  app.use('/stop', stopRouter);
  app.use('/trip', tripRouter);
  app.use('/photo', photoRouter);
  app.use('/soundtrack', soundtrackRouter);
  app.use('/test', test);
  app.use('/pois', poiRouter);
};
