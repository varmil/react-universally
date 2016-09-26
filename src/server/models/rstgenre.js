'use strict';
module.exports = function(sequelize, DataTypes) {
  var RstGenre = sequelize.define('RstGenre', {
    rst_id: DataTypes.INTEGER,
    genre_id: DataTypes.INTEGER
  }, {
    tableName: 'RstsGenres'
  });
  return RstGenre;
};
