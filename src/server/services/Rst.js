import _ from 'lodash'
import fs from 'fs-extra'
import models from '../models'
import csv from '../csv'
import masterBudget from '../../shared/master/budget'


// レストランのアイキャッチ画像保存パス
const EYE_CATCHING_IMAGE_BASEPATH = 'public/img/eye-catching/'

export default class Rst {
  /**
   * 新規レストラン登録
   */
  static async Register(body, files) {
    // 予算情報のパース
    const { lowerLimit, upperLimit } = masterBudget[body.budgetId]

    // レストラン情報保存
    const createdRst = await models.Rst.create({
      name: body.rstName,
      address: body.rstAddress,
      phone_number: body.rstPhone,
      area: body.area,
      genre_id: body.genreId,
      low_budget: lowerLimit,
      high_budget: upperLimit,
    })

    // ジャンル情報の登録
    await models.RstGenre.create({
      rst_id: createdRst.id,
      genre_id: body.genreId,
    })

    // レストランのアイキャッチ画像情報保存
    const filePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        // 一時置き場から画像ファイルを移動する
        const destination = `${EYE_CATCHING_IMAGE_BASEPATH}${createdRst.id}`
        const newPath = `${destination}/${file.filename}`
        fs.move(file.path, newPath, (err) => {
          if (err) throw err

          resolve({
            rst_id: createdRst.id,
            filename: file.filename,
            destination: destination,
            path: newPath,
            size: file.size,
          })
        })
      })
    })
    const images = await Promise.all(filePromises)
    await models.EyeCatchingImage.bulkCreate(images)

    return true
  }
}
