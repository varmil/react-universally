'use strict';
module.exports = function(sequelize, DataTypes) {
  var Rst = sequelize.define('Rst', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    area: DataTypes.STRING,
    genre_id: DataTypes.INTEGER,
    low_budget: DataTypes.INTEGER,
    high_budget: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    latlng: DataTypes.GEOMETRY,
    link: DataTypes.STRING,
    open_hours: DataTypes.TEXT,
    pr_text: DataTypes.STRING,
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
