import { handleActions } from 'redux-actions'
import { Restaurants, Restaurant } from '../constants/ActionTypes'

const initialListState = {
  dict: {},
};

const initialItemState = {
  id: 0,
  name: '',
  area: '',
  genre: '',
  rating: undefined,
  lowerLimitBudget: undefined,
  upperLimitBudget: undefined,
};




const item = (state = initialItemState, actionType, payload) => {
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
      previous[id] = item(undefined, Restaurant.SET, restaurants[id])
      return previous
    }, {})

    return { ...state, dict }
  },
}, initialListState)
