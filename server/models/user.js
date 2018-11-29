'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    spotifyId: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
