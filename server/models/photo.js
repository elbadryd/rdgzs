'use strict';
module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define('photo', {
    tripId: DataTypes.INTEGER,
    geotag: DataTypes.JSON,
    link: DataTypes.STRING,
    publicId: DataTypes.STRING
  }, {});
  photo.associate = function(models) {
    // associations can be defined here
  };
  return photo;
};