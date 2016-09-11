// refs: http://expressjs.com/ja/guide/routing.html
import express from 'express'
const router = express.Router()

// STUB
import restaurantList from '../../stub/restaurantList'
import * as stubRestaurantDetail from '../../stub/restaurantDetail'

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})


// define the home page route
router.get('/', (req, res) => {
  res.json('Birds home page')
})

router.get('/restaurant/list', (req, res) => {
  res.json(restaurantList)
})

router.get('/restaurant/detail/common', (req, res) => {
  res.json(stubRestaurantDetail.common)
})

router.get('/restaurant/detail/top', (req, res) => {
  res.json(stubRestaurantDetail.top)
})

router.get('/restaurant/detail/photo', (req, res) => {
  res.json(stubRestaurantDetail.photo)
})

export default router
