import { handleActions } from 'redux-actions'
import { RestaurantDetail } from '../constants/ActionTypes'

const initialState = {}

export default handleActions({
  [RestaurantDetail.SET]: (state, action) => {
    return action.payload
  },
}, initialState);
