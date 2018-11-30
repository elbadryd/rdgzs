'use strict';
module.exports = (sequelize, DataTypes) => {
  const stop = sequelize.define('stop', {
    tripId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    long_lat: DataTypes.STRING,  
  }, {});
  stop.associate = function(models) {
    // associations can be defined here
  };
  return stop;
};