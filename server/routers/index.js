const { loginRouter } = require('./login');
const { signupRouter } = require('./signup');
const { createRoute } = require('./createRoute');
const { redrawRouter } = require('./redraw');
const { addStopRouter } = require('./addStop');
const { addTripRouter } = require('./addTrip');

module.exports = (app) => {
  app.use('/login', loginRouter);
  app.use('/signup', signupRouter);
  app.use('/createRoute', createRoute);
  app.use('/redraw', redrawRouter);
  app.use('/addStop', addStopRouter);
  app.use('/addTrip', addTripRouter);
};
