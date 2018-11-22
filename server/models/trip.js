'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('trip', {
    userId: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    date: DataTypes.DATE,
    name: DataTypes.STRING
  }, {});
  Trip.associate = function(models) {
    // associations can be defined here
  };
  return Trip;
};