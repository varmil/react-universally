var _ = require('lodash')
var csv = require('csv-parser')
var fs = require('fs')
var models = require('../models')

const GENRE_CUISINE_MAPPING_CSV_PATH = '/../csv/fb-genre-ta-cuisine-mapping.csv'
const CUISINE_CSV_PATH = '/../csv/cuisine.csv'
const RST_CSV_PATH = '/../csv/tripa-phnom-penh.csv'

// key: name, value: id
let cuisines = {}
// key: foodbookGenreId (int), value: tripAdvisorCuisineId (int array)
let genreCuisineMapping = []



function mapCuisineIdsToGenreIds(strCuisines) {
  if (! strCuisines) return []

  const genreIds = strCuisines.split(',').map(function(e) {
    const cuisineId = cuisines[e.trim()] * 1

    // cuisine to genre with mapping csv
    // マップ表が逆になっているので面倒くさい…
    return _.find(genreCuisineMapping, function(o) {
      return o.tripAdvisorCuisineIds.indexOf(cuisineId) !== -1
    }).foodbookGenreId
  })

  return genreIds
}

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




function insertRst(data) {
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
    console.error('ERROR [RST] message:', error.message, '\n' , 'sql:', error.sql)
  })
}

function insertRstGenre(data) {
  const genreIds = mapCuisineIdsToGenreIds(data.Cuisine)

  // Cuisineが設定されていなければInsertしない
  if (genreIds.length === 0) return Promise.resolve()

  const bulkData = genreIds.map(function(genre) {
    return { rst_id: data.id, genre_id: genre }
  })

  return models.RstGenre.bulkCreate(bulkData)
    .catch(function(error) {
      console.error('ERROR [RST_GENRE] message:', error.message, '\n' , 'sql:', error.sql)
    })
}




function loadCuisineCsv() {
  return new Promise(function(resolve, reject) {
    fs.createReadStream(__dirname + CUISINE_CSV_PATH)
      .pipe(csv())
      .on('data', function (data) {
        cuisines[data.name] = data.id
      })
      .on('end', function () {
        resolve()
      })
  })
}

function loadGenreCuisineMappingCsv() {
  return new Promise(function(resolve, reject) {
    fs.createReadStream(__dirname + GENRE_CUISINE_MAPPING_CSV_PATH)
      .pipe(csv())
      .on('data', function (data) {
        genreCuisineMapping.push({
          foodbookGenreId: data.foodbookGenreId,
          tripAdvisorCuisineIds: data.tripAdvisorCuisineId.split(',').map(id => id * 1),
        })
      })
      .on('end', function () {
        resolve()
      })
  })
}

function loadRstCsvAndSave() {
  // 全てのデータが保存されたら、全部resolve
  let promises = []

  return new Promise(function(resolve, reject) {
    fs.createReadStream(__dirname + RST_CSV_PATH)
      .pipe(csv())
      .on('data', function (data) {
        promises.push(insertRst(data))
        // insert BelongsToMany data
        promises.push(insertRstGenre(data))
      })
      .on('end', function () {
        Promise.all(promises).then(function() {
          resolve()
        })
      })
  })
}




return models.Rst.truncate()
  .then(loadCuisineCsv)
  .then(loadGenreCuisineMappingCsv)
  .then(loadRstCsvAndSave)
  .then(function() {
    console.log('### INSERT FINISHED ###')
  })
