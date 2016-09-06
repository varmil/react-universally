import { createAction } from 'redux-actions'
import { RestaurantDetail } from '../constants/ActionTypes'

export let set = createAction(RestaurantDetail.SET, (data) => {
  return data
})
