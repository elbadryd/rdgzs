server.get('/', (req, res) => {
  db.sequelize.query('select * from users where id = 1')
    .then((user) => {
      console.log(user[0][0]);
    });
  res.send(`bazinga id: ${req.sessionID}`);
});