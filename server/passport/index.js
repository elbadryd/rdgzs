// require passport
const passport = require('passport');
// require session 
const session = require('express-session')
// require databse
const db = require('../models');

const options = require('session opts in config');

module.exports = (app) => {
  app.use(session('XXXX'));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      // check db user for where user username === username
      // if email === dbemail && username === dbusername
      // email =  `"some email"; DROP DATABASE;`;
      console.log('passport hit', email, password);
      db.sequelize.models.user.findOne({
        where: {
          email,
          password,
        },
        raw: true,
      })
        .then((user) => {
          console.log(user, 'USER');
          if (!user) {
            done(new Error('wrong creds, try again'));
          } else {
            done(null, user);
          }
        });
    },
  ));
};
