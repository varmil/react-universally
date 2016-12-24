import _ from 'lodash'
import fs from 'fs-extra'
import models from '../models'
import csv from '../csv'
import masterBudget from '../../shared/master/budget'


// レストランのアイキャッチ画像保存パス
const EYE_CATCHING_IMAGE_BASEDIRECTORY = 'public/'
const EYE_CATCHING_IMAGE_BASEPATH = `${EYE_CATCHING_IMAGE_BASEDIRECTORY}img/eye-catching/`

export default class Rst {
  /**
   * 新規レストラン登録
   */
  static async Register(body, files) {
    // 予算情報のパース
    const { lowerLimit, upperLimit } = masterBudget[body.budgetId]

    // レストラン情報保存（パラメタ文字列なので必要に応じて数値変換する）
    const values = {
      name: body.rstName,
      address: body.rstAddress,
      phone_number: body.rstPhone,
      area: body.area,
      low_budget: lowerLimit,
      high_budget: upperLimit,
    }
    let rstId;
    if (body.rstId * 1) {
      values.id = body.rstId,
      await models.Rst.update(values, { where: { id: body.rstId } })
      rstId = body.rstId
    } else {
      const createdRst = await models.Rst.create(values)
      rstId = createdRst.id
    }

    // ジャンル情報の登録
    await models.RstGenre.upsert({
      rst_id: rstId,
      genre_id: body.genreId,
    })

    // レストランのアイキャッチ画像情報保存
    const filePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        // 一時置き場から画像ファイルを移動する
        const destination = `${EYE_CATCHING_IMAGE_BASEPATH}${rstId}`
        const newPath = `${destination}/${file.filename}`
        fs.move(file.path, newPath, (err) => {
          if (err) throw err

          resolve({
            rst_id: rstId,
            filename: file.filename,
            // public/ はURLアクセスの際は不要なので消しておく
            destination: destination.replace(EYE_CATCHING_IMAGE_BASEDIRECTORY, ''),
            path: newPath.replace(EYE_CATCHING_IMAGE_BASEDIRECTORY, ''),
            size: file.size,
          })
        })
      })
    })
    const images = await Promise.all(filePromises)
    await models.EyeCatchingImage.bulkCreate(images)

    return true
  }


  /**
   * レストラン情報取得
   */
  static async Fetch(id) {
    const rst = await models.Rst.findById(id, { raw: true })
    const genreId = await models.RstGenre.findOne({
      attributes: [ 'genre_id' ],
      where: { rst_id: rst.id },
      order: [[ 'id', 'ASC' ]],
      raw: true,
    })
    const images = await models.EyeCatchingImage.findAll({
      attributes: [ 'path' ],
      where: { rst_id: rst.id },
      order: [[ 'id', 'ASC' ]],
      raw: true,
    })
    return { ...rst, ...genreId, images }
  }


}
