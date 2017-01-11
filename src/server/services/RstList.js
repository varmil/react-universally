import _ from 'lodash'
import models from '../models'
import genreMaster from '../../shared/master/genre'

export default class RstList {
    static async fetch(reqQuery) {
        let rsts = {}

        // ジャンル検索の場合
        if (reqQuery.genreId) {
            rsts = await RstList.fetchWithGenreId(reqQuery.genreId)
        }

        // レストランID直接検索
        else if (reqQuery.rstId) {
            rsts = await RstList.fetchWithRstId(reqQuery.rstId)
        }

        // TODO: FULLTEXT search ?
        // else if (reqQuery.genreText) {
        // }

        // 条件なし
        else {
            rsts = await RstList.fetchWithNoConditions(reqQuery.rstId)
        }

        // ジャンル情報の取得
        const rstGenre = await models.RstGenre.findAll({
            attributes: [ 'rst_id', 'genre_id' ],
            where: { rst_id: _.map(rsts.rows, 'id') },
            raw: true,
        })

        // クライアントに渡すために成形
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


    static async fetchWithGenreId(id) {
        const genres = await models.RstGenre.findAll({
            attributes: [ 'rst_id' ],
            where: { genre_id: id },
            order: [[ 'rst_id', 'ASC' ]],
            limit: 10,
            offset: 0,
            raw: true,
        })
        const rsts = await models.Rst.findAndCountAll({
            where: { id: _(genres).map('rst_id').value() },
            order: [[ 'id', 'ASC' ]],
            raw: true,
        })
        return rsts
    }


    static async fetchWithRstId(id) {
        const rsts = await models.Rst.findAndCountAll({
            where: { id: id },
            raw: true,
        })
        return rsts
    }


    static async fetchWithNoConditions(id) {
        const rsts = await models.Rst.findAndCountAll({
            order: [[ 'id', 'ASC' ]],
            limit: 10,
            offset: 0,
            raw: true,
        })
        return rsts
    }

}
