'use strict';
module.exports = (sequelize, DataTypes) => {
  const spotify = sequelize.define('spotify', {
    userId: DataTypes.INTEGER,
    profileId: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
  }, {});
  spotify.associate = function (models) {
    // associations can be defined here
  };
  return spotify;
};