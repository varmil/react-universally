// refs: http://expressjs.com/ja/guide/routing.html
import express from 'express'
import passport from 'passport'
import _ from 'lodash'
import uuid from 'uuid'
import multer from 'multer'

// STUB
import restaurantList from '../../stub/restaurantList'
import * as stubRestaurantDetail from '../../stub/restaurantDetail'

import models from '../../models'
import services from '../../services'

const router = express.Router()

// https://github.com/felixrieseberg/React-Dropzone-Component/blob/master/example/src-server/multerImpl.js
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    let ext
    // 適切な拡張子を付与
    switch (file.mimetype) {
      case 'image/jpeg':
        ext = '.jpg'
        break
      case 'image/png':
        ext = '.png'
        break
      case 'image/gif':
        ext = '.gif'
        break
      default:
        console.error('file.mimetype does NOT match any type')
    }
    cb(null, uuid() + ext)
  }
})
const upload = multer({ storage })




// middleware that is specific to this router
router.use(function userLog(req, res, next) {
  console.log('get userinfo if logged in :', req.user)
  next()
})


// define the home page route
router.get('/', (req, res) => {
  // FOR TESTING
  models.User.findOrCreate(
    {
      where: { id: 123456789 },
      defaults: { id: 123456789, name: 'test user Akihiro' }
    }
  ).spread((user, created) => {
    res.send( { user: user, created: created })
  })
  // ------------------
})

// // get user info
// router.get('/user', (req, res) => {
//   let result = {}
//
//   // passport認証済かチェック
//   if (req.isAuthenticated()) {
//     result = { ...result, id: req.user.id, isLoggedIn: true }
//   } else {
//     result.isLoggedIn = false
//   }
//
//   return res.json(result)
// })

router.get('/restaurant/list', async (req, res) => {
  console.log(req.query)
  const result = await services.RstList.fetch(req.query)
  res.json(result)
})

router.get('/restaurant/detail/:id/common', (req, res) => {
  // IDをパラメタのものに書き換えておく（仮）
  let data = stubRestaurantDetail.common
  data.id = req.params.id
  res.json(data)
})

router.get('/restaurant/detail/:id/top', (req, res) => {
  res.json(stubRestaurantDetail.top)
})

router.get('/restaurant/detail/:id/photo', (req, res) => {
  res.json(stubRestaurantDetail.photo)
})

router.get('/restaurant/detail/:id/reviews', (req, res) => {
  res.json(stubRestaurantDetail.reviews)
})

router.get('/restaurant/detail/:rstId/review/:rvwId', (req, res) => {
  res.json(stubRestaurantDetail.review)
})



router.get(`/autocomplete/rst/`, async (req, res) => {
  const inputValue = req.query.value
  if (! inputValue) return res.json([])

  const result = await services.AutoComplete.fetchGenreOrRestaurant(inputValue)

  res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate')
  res.json(result)
})




// ------------------------------------------------------------
// 編集系
// ------------------------------------------------------------
router.post('/restaurant/edit', upload.array('eyecatch'), async (req, res) => {
    // if (! req.isAuthenticated()) return res.status(403).send('User MUST login first')

    const body = req.body
    const files = req.files

    console.log(body)
    console.log(files)

    // 必須入力項目チェック
    if (! body.rstName || ! body.rstAddress || ! body.rstPhone)
      return res.status(500).send('requied params are absent')

    // save into mysql
    try {
      const result = await services.Rst.Register(body, files)
      res.json(result)
    } catch (e) {
      console.error(e)
      res.status(500).send(e)
    }
  }
)

// レストラン情報の全部を返す汎用API（データ量多いので注意）
router.get('/restaurant/info/:id', async (req, res) => {
  const result = await services.Rst.Fetch(req.params.id)
  res.json(result)
})




router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    console.log('####### SUCCESS LOGIN #######', req.user)
    // とりあえず最小限のidだけ返しておく。
    res.json({ id: req.user.id })
  }
)

router.post('/logout', (req, res) => {
    console.log('####### LOGOUT #######', req.user)
    req.logout()
    res.json(true)
  }
)



export default router
