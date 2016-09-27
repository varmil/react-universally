var db = require('../models')

const tableName = 'Rsts'

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      low_budget: {
        type: Sequelize.INTEGER
      },
      high_budget: {
        type: Sequelize.INTEGER
      },
      open_hours: {
        type: Sequelize.TEXT
      },
      address: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    },
    {
      engine: 'Mroonga'
    })
    .then(function() {
      // Possible options:
      // - indicesType: UNIQUE|FULLTEXT|SPATIAL
      // - indexName: The name of the index. Default is __
      // - parser: For FULLTEXT columns set your parser
      // - indexType: Set a type for the index, e.g. BTREE. See the documentation of the used dialect
      // - logging: A function that receives the sql query, e.g. console.log
      return db.sequelize.query(`ALTER TABLE ${tableName} ADD FULLTEXT INDEX idx_rsts_name(name);`)
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName);
  }
};
