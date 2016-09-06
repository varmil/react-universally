import { createAction } from 'redux-actions'
import { RestaurantDetail } from '../constants/ActionTypes'

export let fetchStart = createAction(RestaurantDetail.FETCH, () => {
  return { nowLoading: true }
})

export let fetchSuccess = createAction(RestaurantDetail.FETCH_SUCCESS, () => {
  return { nowLoading: false }
})

export let set = createAction(RestaurantDetail.SET, (data) => {
  return { data }
})
