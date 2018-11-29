const { loginRouter } = require('./login');
const { signupRouter } = require('./signup');
const { createRoute } = require('./createRoute');
const { redrawRouter } = require('./redraw');

module.exports = (app) => {
  app.use('/login', loginRouter);
  app.use('/signup', signupRouter);
  app.use('/createRoute', createRoute);
  app.use('/redraw', redrawRouter);
};
