import { createAction } from 'redux-actions'
import { Restaurants } from '../constants/ActionTypes'

export let setQuery = createAction(Restaurants.SET_QUERY, (value) => value)

export let replaceRestaurants = createAction(Restaurants.REPLACE_RESTAURANTS, (values) => {
  return { restaurants: values }
})


/******************************************************************************/
/******************************* ASYNC ACTIONS ********************************/
/******************************************************************************/

export let fetchRequest = createAction(Restaurants.FETCH_REQUEST, (query, params) => { return { query, params } })
