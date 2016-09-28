// refs: http://expressjs.com/ja/guide/routing.html
import express from 'express'
import passport from 'passport'
import _ from 'lodash'

// STUB
import restaurantList from '../../stub/restaurantList'
import * as stubRestaurantDetail from '../../stub/restaurantDetail'

import models from '../../models'

const router = express.Router()


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

router.get('/restaurant/list', (req, res) => {
  // console.log(req.query)
  res.json(restaurantList)
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



// TODO: ロジックは別クラスに移動
router.get(`/autocomplete/rst/`, async (req, res) => {
  const name = req.query.value
  if (! name) return res.json([])

  const names = name.split(/[\s,]+/)
  const queries = names.filter(e => !!e).map(name => {
    // escaping
    return `\+${name}\*`
  }).join(' ')
  const rows = await models.Rst.findAll({
    attributes: ['id', 'name'],
    where: [`MATCH (name) AGAINST(? IN BOOLEAN MODE)`, queries],
    limit: 4,
  })
  const candidates = _.map(rows, (row) => {
    return _.pick(row, 'id', 'name')
  })

  res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate')
  res.json(candidates)
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
