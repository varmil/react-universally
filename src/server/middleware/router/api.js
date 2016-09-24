// refs: http://expressjs.com/ja/guide/routing.html
import express from 'express'
import passport from 'passport'

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
  res.json('Birds home page')
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
