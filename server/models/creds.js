'use strict';
module.exports = (sequelize, DataTypes) => {
  const creds = sequelize.define('creds', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {});
  creds.associate = function(models) {
    // associations can be defined here
  };
  return creds;
};