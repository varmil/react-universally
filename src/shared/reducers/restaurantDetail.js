import { handleActions } from 'redux-actions'
import { RestaurantDetail } from '../constants/ActionTypes'

const initialState = {
  nowLoading: true,
  common: {},
  top: {},
  photo: {},
  reviews: [],
  review: {},
}

export default handleActions({
  [RestaurantDetail.FETCH]: (state, action) => {
    const nowLoading = action.payload.nowLoading
    return { ...state, nowLoading }
  },
  [RestaurantDetail.FETCH_SUCCESS]: (state, action) => {
    const nowLoading = action.payload.nowLoading
    return { ...state, nowLoading }
  },
  [RestaurantDetail.SET_COMMON]: (state, action) => {
    const data = action.payload.data
    return { ...state, common: data }
  },
  [RestaurantDetail.SET_TOP]: (state, action) => {
    const data = action.payload.data
    return { ...state, top: data }
  },
  [RestaurantDetail.SET_PHOTO]: (state, action) => {
    const data = action.payload.data
    return { ...state, photo: data }
  },
  [RestaurantDetail.SET_REVIEWS]: (state, action) => {
    const data = action.payload.data
    return { ...state, reviews: data }
  },
  [RestaurantDetail.SET_REVIEW]: (state, action) => {
    const data = action.payload.data
    return { ...state, review: data }
  },
}, initialState);
