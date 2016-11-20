var db = require('../models')

const tableName = db.RstGenre.tableName

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rst_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      genre_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addIndex(tableName, ['rst_id']))
    .then(() => queryInterface.addIndex(tableName, ['genre_id']))
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName);
  }
};
