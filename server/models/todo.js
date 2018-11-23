'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('todo', {
    title: DataTypes.STRING
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};