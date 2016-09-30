import _ from 'lodash'
import models from '../models'


export default class AutoComplete {
  /**
   *
   */
  static async fetchGenreOrRestaurant(inputValue) {
    // TODO: 全文検索の前に、まず固定タグ（中華、ファストフード etc...）で一致するか見る



    const inputValueArr = inputValue.split(/[\s,]+/)
    // escaping
    const queries = inputValueArr.filter(e => !!e).map(name => `\+${name}\*`).join(' ')
    const rows = await models.Rst.findAll({
      attributes: ['id', 'name'],
      where: [`MATCH (name) AGAINST(? IN BOOLEAN MODE)`, queries],
      limit: 4,
    })
    const candidates = _.map(rows, (row) => {
      return _.pick(row, 'id', 'name')
    })

    return candidates
  }
}
