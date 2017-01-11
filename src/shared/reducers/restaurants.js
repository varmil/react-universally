import { handleActions } from 'redux-actions'
import { Restaurants, Restaurant } from '../constants/ActionTypes'

const initialListState = {
  searchQuery: '',
  dict: {},
};



const restaurant = (state = {}, actionType, payload) => {
  switch (actionType) {
    case Restaurant.SET:
      return payload
    default:
      return state
  }
}



export default handleActions({
  // ページング想定。ページング時はstoreの状態を置き換えるイメージ。無限スクロールの場合はADDしていく感じ。
  [Restaurants.REPLACE_RESTAURANTS]: (state, action) => {
    const restaurants = action.payload.restaurants

    const dict = Object.keys(restaurants).reduce((previous, id) => {
      previous[id] = restaurant(undefined, Restaurant.SET, restaurants[id])
      return previous
    }, {})

    return { ...state, dict }
  },

  [Restaurants.SET_QUERY]: (state, action) => ({
    ...state,
    searchQuery: action.payload
  }),
}, initialListState)
