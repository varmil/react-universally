import { createAction } from 'redux-actions'
import { Restaurants } from '../constants/ActionTypes'

export let replaceRestaurants = createAction(Restaurants.REPLACE_RESTAURANTS, (values) => {
  return { restaurants: values }
})
