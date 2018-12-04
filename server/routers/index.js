const { loginRouter } = require('./login');
const { signupRouter } = require('./signup');
const { createRoute } = require('./createRoute');
const { redrawRouter } = require('./redraw');
const { stopRouter } = require('./stop');
const { tripRouter } = require('./trip');
const { logoutRouter } = require('./logout');
const { photoRouter } = require('./photo');
const { getTracksRouter } = require('./getTracks');
const { artistIdRouter } = require('./artistId');

module.exports = (app) => {
  app.use('/login', loginRouter);
  app.use('/logout', logoutRouter);
  app.use('/signup', signupRouter);
  app.use('/createRoute', createRoute);
  app.use('/redraw', redrawRouter);
  app.use('/stop', stopRouter);
  app.use('/trip', tripRouter);
  app.use('/photo', photoRouter);
  app.use('/getTracks', getTracksRouter);
  app.use('/artistId', artistIdRouter);
};
