// refs: http://expressjs.com/ja/guide/routing.html
import express from 'express'
const router = express.Router()

// STUB
import * as restaurantList from '../../../shared/stub/restaurantList'

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
  const stub = restaurantList.default
  res.json(stub)
})

router.get('/restaurant/detail/common', (req, res) => {
  res.json('About birds')
})

router.get('/restaurant/detail/top', (req, res) => {
  res.json('About birds')
})

router.get('/restaurant/detail/photo', (req, res) => {
  res.json('About birds')
})

export default router
