import { createAction } from 'redux-actions'
import { RestaurantDetail } from '../constants/ActionTypes'

// export let fetchStart = createAction(RestaurantDetail.FETCH_REQUEST, () => {
//   return { nowLoading: true }
// })
//
// export let fetchSuccess = createAction(RestaurantDetail.FETCH_SUCCESS, () => {
//   return { nowLoading: false }
// })

export let setTabsValue = createAction(RestaurantDetail.SET_TABS_VALUE, (data) => data)

export let setCommon = createAction(RestaurantDetail.SET_COMMON, (data) => {
  return { data }
})

export let setTop = createAction(RestaurantDetail.SET_TOP, (data) => {
  return { data }
})

export let setPhoto = createAction(RestaurantDetail.SET_PHOTO, (data) => {
  return { data }
})

export let setReviews = createAction(RestaurantDetail.SET_REVIEWS, (data) => {
  return { data }
})

export let setReview = createAction(RestaurantDetail.SET_REVIEW, (data) => {
  return { data }
})
