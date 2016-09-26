'use strict';
module.exports = function(sequelize, DataTypes) {
  var Rst = sequelize.define('Rst', {
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    low_budget: DataTypes.INTEGER,
    high_budget: DataTypes.INTEGER,
    open_hours: DataTypes.TEXT,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Rst;
};
