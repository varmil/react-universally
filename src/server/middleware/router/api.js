// refs: http://expressjs.com/ja/guide/routing.html
import express from 'express'
const router = express.Router()

// STUB
import restaurantList from '../../stub/restaurantList'
import * as stubRestaurantDetail from '../../stub/restaurantDetail'


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now())
  next()
})


// define the home page route
router.get('/', (req, res) => {
  res.json('Birds home page')
})

router.get('/restaurant/list', (req, res) => {
  // console.log(req.query)
  res.json(restaurantList)
})

router.get('/restaurant/detail/:id/common', (req, res) => {
  // console.log(req.params)
  res.json(stubRestaurantDetail.common)
})

router.get('/restaurant/detail/:id/top', (req, res) => {
  res.json(stubRestaurantDetail.top)
})

router.get('/restaurant/detail/:id/photo', (req, res) => {
  res.json(stubRestaurantDetail.photo)
})


export default router
