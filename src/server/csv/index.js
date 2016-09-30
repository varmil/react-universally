// use sync parser
var parse     = require('csv-parse/lib/sync');
var _         = require('lodash');
var fs        = require('fs');
var path      = require('path')
var basename  = path.basename(__filename);
var result    = {}


function readCsv(file) {
    const content = fs.readFileSync(path.resolve(__dirname, file))
    const records = parse(content, {columns: true})

    return records.reduce((prv, cur) => {
      if (! cur.id) throw new Error('csv must have id column. file: ', file)
      prv[cur.id] = cur
      return prv
    }, {})
}


fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-4) === '.csv')
  })
  .forEach((file) => {
    // parse the csv
    const records = readCsv(file)
    // set data
    const withoutExt = file.slice(0, -4)
    const camelized = _.camelCase(withoutExt)
    result[camelized] = records
  })


export default result
