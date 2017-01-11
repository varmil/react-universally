import _ from 'lodash'
import models from '../models'
import csv from '../csv'


export default class AutoComplete {
  /**
   * レストラン検索
   */
  static async fetchGenreOrRestaurant(inputValue) {
    // 全文検索の前に、まず固定タグ（中華、ファストフード etc...）で一致するか見る
    // ジャンルを帰す場合は、IDと{ genre: true }のような識別プロパティを含める
    // （クライアント側で表示の仕方を変えたいので）
    const genres = _(AutoComplete.findAllGenreCandidates(inputValue)).take(3).map(e => Object.assign(e, { isCategorySuggest: true })).value()


    // DBからFULLTEXT search
    const inputValueArr = inputValue.split(/[\s,]+/)
    // escaping
    const queries = inputValueArr.filter(e => !!e).map(name => `\+${name}\*`).join(' ')
    const rows = await models.Rst.findAll({
      attributes: ['id', 'name'],
      where: [`MATCH (name) AGAINST(? IN BOOLEAN MODE)`, queries],
      limit: 4,
    })
    const candidates = _.map(rows, (row) => {
      return _(row).pick('id', 'name').assign({ isCategorySuggest: false }).value()
    })


    // ジャンルを優先的に表示させたい
    const final = _.take(genres.concat(candidates), 5)
    return final
  }

  static findAllGenreCandidates(inputValue) {
    const loweredInputValue = inputValue.toLowerCase()
    const candidates = _.filter(csv.cuisine, (e) => {
      return e.name.toLowerCase().indexOf(loweredInputValue) === 0
    })
    return candidates
  }
}
