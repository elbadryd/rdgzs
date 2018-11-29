'use strict';
module.exports = (sequelize, DataTypes) => {
  const trip = sequelize.define('trip', {
    userId: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    trip_name: DataTypes.STRING,
    origin_name: DataTypes.STRING,
    destination_name: DataTypes.STRING,
    img: DataTypes.STRING,
  }, {});
  trip.associate = function(models) {
    // associations can be defined here
  };
  return trip;
};
