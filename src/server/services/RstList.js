import _ from 'lodash'
import models from '../models'
import genreMaster from '../../shared/master/genre'

const PER_PAGE_CONTENTS = 10
const FIRST_PAGE_NUMBER = 1

export default class RstList {
    static async fetch(reqQuery) {
        let rsts = {}

        // 制約
        const budgetConstraint = RstList.createBudgetConstraint(reqQuery.lowerLimitBudget, reqQuery.upperLimitBudget)
        const page = reqQuery.page || FIRST_PAGE_NUMBER

        // ジャンル検索の場合
        if (reqQuery.genreId) {
            rsts = await RstList.fetchWithGenreId(reqQuery.genreId, page, budgetConstraint)
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
            rsts = await RstList.fetchWithNoConditions(page, budgetConstraint)
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


    static async fetchWithGenreId(id, page, budgetConstraint) {
        const genres = await models.RstGenre.findAll({
            attributes: [ 'rst_id' ],
            where: { genre_id: id, ...budgetConstraint },
            order: [[ 'rst_id', 'ASC' ]],
            limit: PER_PAGE_CONTENTS,
            offset: PER_PAGE_CONTENTS * (page - 1),
            raw: true,
        })
        const rsts = await models.Rst.findAndCountAll({
            where: { id: _(genres).map('rst_id').value() },
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


    static async fetchWithNoConditions(page, budgetConstraint) {
        const rsts = await models.Rst.findAndCountAll({
            where: { ...budgetConstraint },
            order: [[ 'id', 'ASC' ]],
            limit: PER_PAGE_CONTENTS,
            offset: PER_PAGE_CONTENTS * (page - 1),
            raw: true,
        })
        return rsts
    }


    // 予算制約。NULLを除外する
    static createBudgetConstraint(lowerLimitBudget, upperLimitBudget) {
        let lower = {}
        let upper = {}

        if (lowerLimitBudget) lower = { low_budget: { gte: lowerLimitBudget } }
        if (upperLimitBudget) upper = { high_budget: { lte: upperLimitBudget } }

        return { ...lower, ...upper }
    }


}
