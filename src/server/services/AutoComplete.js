import _ from 'lodash'
import models from '../models'
import genreMaster from '../../shared/master/genre'


export default class AutoComplete {
  /**
   * レストラン検索
   */
  static async fetchGenreOrRestaurant(inputValue) {
    // 全文検索の前に、まず固定タグ（中華、ファストフード etc...）で一致するか見る
    // ジャンルを帰す場合は、IDと{ genre: true }のような識別プロパティを含める
    // （クライアント側で表示の仕方を変えたいので）
    const genres = _(AutoComplete.findAllGenreCandidates(inputValue)).take(3).map(e => Object.assign(e, { isCategorySuggest: true })).value()


    // escaping & DBからFULLTEXT search
    const inputValueArr = inputValue.replace(/\+|\-/g, '').split(/[\s,]+/).filter(e => !!e)
    const queries = inputValueArr.map(name => `\+${name}\*`).join(' ')
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
    const candidates = _(genreMaster)
        .map((name, id) => { return { id: id, name: name } })
        .filter(e => e.name.toLowerCase().indexOf(loweredInputValue) === 0)
    return candidates
  }
}
