'use strict';
module.exports = function(sequelize, DataTypes) {
  var Rst = sequelize.define('Rst', {
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    low_budget: DataTypes.INTEGER,
    high_budget: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    open_hours: DataTypes.TEXT,
    pr_text: DataTypes.STRING,
    address: DataTypes.STRING,
    latlng: DataTypes.GEOMETRY,
    phone_number: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },

    // http://docs.sequelizejs.com/en/latest/docs/scopes/
    scopes: {
    }
  });
  return Rst;
};
