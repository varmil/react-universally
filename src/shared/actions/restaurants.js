import { createAction } from 'redux-actions'
import { Restaurants } from '../constants/ActionTypes'

export let setQuery = createAction(Restaurants.SET_QUERY, (value) => value)

export let replaceRestaurants = createAction(Restaurants.REPLACE_RESTAURANTS, (values) => {
  return { restaurants: values }
})
