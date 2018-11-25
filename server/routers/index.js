
// require passport
// const db = require('../models');
const loginRouter = require('./login');
const signupRouter = require('./signup');
const createRouter = require('./createRoute');

// createRouter.get('/', (req, res) => {
//   db.sequelize.query('select * from users where id = 1')
//     .then((user) => {
//       console.log(user[0][0]);
//     });
//   res.send(`bazinga id: ${req.sessionID}`);
// });

module.exports = (app) => {
  app.use('/login', loginRouter);
  app.use('/signup', signupRouter);
  app.use('/createRoute', createRouter);
};
