var csv = require('csv-parser')
var fs = require('fs')
var models = require('../models')

const CSV_PATH = '/../csv/tripa-phnom-penh.csv'

function parseAveragePrices(avgPrice) {
  // 空文字、単一値、下限上限の3パターン
  let lowBudget, highBudget
  if (! avgPrice) {
    // empty string
  } else if (avgPrice.indexOf('-') !== -1) {
    const splited = avgPrice.split('-')
    // low and high
    lowBudget = splited[0].replace(/[^0-9^\.]/g, '')
    highBudget = splited[1].replace(/[^0-9^\.]/g, '')
  } else {
    // single value
    lowBudget = highBudget = avgPrice.replace(/[^0-9^\.]/g, '')
  }

  return { lowBudget, highBudget }
}




function insert(data) {
  const { lowBudget, highBudget } = parseAveragePrices(data["Average prices"])

  return models.Rst.create({
    name: data.name,
    link: data.link,
    low_budget: lowBudget,
    high_budget: highBudget,
    address: data.Address,
    open_hours: data["Open Hours"],
    phone_number: data["Phone Number"],
  })
  .catch(function(error) {
    console.error('ERROR message:', error.message, '\n' , 'sql:', error.sql)
  })
}




function loadCsvAndSave() {
  // 全てのデータが保存されたら、全部resolve
  let promises = []

  return new Promise(function(resolve, reject) {
    fs.createReadStream(__dirname + CSV_PATH)
      .pipe(csv())
      .on('data', function (data) {
        promises.push(insert(data))
      })
      .on('end', function () {
        Promise.all(promises).then(function() {
          // We are done
          resolve()
        })
      })
  })
}




return models.Rst.truncate()
  .then(loadCsvAndSave)
  .then(function() {
    console.log('### INSERT FINISHED ###')
  })



// module.exports = {
//   up: function (queryInterface, Sequelize) {
//     /*
//       Add altering commands here.
//       Return a promise to correctly handle asynchronicity.
//
//       Example:
//       return queryInterface.bulkInsert('Person', [{
//         name: 'John Doe',
//         isBetaMember: false
//       }], {});
//     */
//
//   },
//
//   down: function (queryInterface, Sequelize) {
//     /*
//       Add reverting commands here.
//       Return a promise to correctly handle asynchronicity.
//
//       Example:
//       return queryInterface.bulkDelete('Person', null, {});
//     */
//
//     // return models.Rst.truncate()
//   }
// };
