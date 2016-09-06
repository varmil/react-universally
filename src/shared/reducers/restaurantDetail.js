import { handleActions } from 'redux-actions'
import { RestaurantDetail } from '../constants/ActionTypes'

const initialState = { nowLoading: true, data: {} }

export default handleActions({
  [RestaurantDetail.FETCH]: (state, action) => {
    const nowLoading = action.payload.nowLoading
    return { ...state, nowLoading }
  },
  [RestaurantDetail.FETCH_SUCCESS]: (state, action) => {
    const nowLoading = action.payload.nowLoading
    return { ...state, nowLoading }
  },
  [RestaurantDetail.SET]: (state, action) => {
    const data = action.payload.data
    return { ...state, data }
  },
}, initialState);
