'use strict';
module.exports = (sequelize, DataTypes) => {
  const trip = sequelize.define('trip', {
    userId: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    date: DataTypes.DATE,
    name: DataTypes.STRING
  }, {});
  trip.associate = function(models) {
    // associations can be defined here
  };
  return trip;
};
