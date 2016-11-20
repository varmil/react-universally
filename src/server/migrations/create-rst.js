var db = require('../models')

const tableName = db.Rst.tableName

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
        unique: true,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      area: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      low_budget: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      high_budget: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      rating: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      latlng: {
        allowNull: false,
        type: Sequelize.GEOMETRY
      },
      link: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
      },
      open_hours: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      pr_text: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '',
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
    // Possible options:
    // - indicesType: UNIQUE|FULLTEXT|SPATIAL
    // - indexName: The name of the index. Default is __
    // - parser: For FULLTEXT columns set your parser
    // - indexType: Set a type for the index, e.g. BTREE. See the documentation of the used dialect
    // - logging: A function that receives the sql query, e.g. console.log
    // return db.sequelize.query(`ALTER TABLE ${tableName} ADD FULLTEXT INDEX idx_rsts_name(name);`)
    .then(() => queryInterface.addIndex(tableName, ['name'], { indicesType: 'FULLTEXT' }))
    .then(() => queryInterface.addIndex(tableName, ['area']))
    .then(() => queryInterface.addIndex(tableName, ['low_budget']))
    .then(() => queryInterface.addIndex(tableName, ['high_budget']))
    .then(() => queryInterface.addIndex(tableName, ['rating']))
    .then(() => queryInterface.addIndex(tableName, ['latlng'], { indicesType: 'SPATIAL' }))
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName);
  }
};
