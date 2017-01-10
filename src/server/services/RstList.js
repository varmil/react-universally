import _ from 'lodash'
import models from '../models'
import genreMaster from '../../shared/master/genre'

export default class RstList {
  static async fetch(reqQuery) {
    let where = {}
    // TODO: カテゴリ or 店舗名を判別
    const genre = reqQuery.genreText

    // レストラン情報の登録
    const rsts = await models.Rst.findAndCountAll({
    //   attributes: [ 'id', 'name' ],
      where: where,
      order: [[ 'id', 'ASC' ]],
      limit: 10,
      offset: 0,
      raw: true,
    })

    // ジャンル情報の登録
    const rstGenre = await models.RstGenre.findAll({
      attributes: [ 'rst_id', 'genre_id' ],
      where: { rst_id: _.map(rsts.rows, 'id') },
      raw: true,
    })

    const rstsFormatted = _.reduce(rsts.rows, (cur, e) => {
        const newObj = {
            [e.id]: {
                id: e.id,
                name: e.name,
                area: e.area,
                genre: _(rstGenre).filter({ rst_id: e.id }).map('genre_id').map(id => genreMaster[id]).value(),
                rating: 3.00,
                review: 0,
                prText: '',
                lowerLimitBudget: e.low_budget,
                upperLimitBudget: e.high_budget,
                distance: 9999,
            }
        }
        return Object.assign(cur, newObj)
    }, {})

    return rstsFormatted
  }
}
