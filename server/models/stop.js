'use strict';
module.exports = (sequelize, DataTypes) => {
  const stop = sequelize.define('stop', {
    tripId: DataTypes.INTEGER,
    placeId: DataTypes.STRING,
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  stop.associate = function(models) {
    // associations can be defined here
  };
  return stop;
};