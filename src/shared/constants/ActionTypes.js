import  { createTypes, async } from './redux-action-types'

export const User = createTypes('user',
  'SET',
  'SET_ID',
)


export const Auth = createTypes('auth',
  'SET_IS_PREPARED',
  'SET_IS_LOGGED_IN',
)


export const SearchForm = createTypes('form',
  'SET_AREA_TEXT',
  'SET_GENRE_TEXT',
  'ADD_AREA_CHIP',
  'REMOVE_AREA_CHIP',
  'ADD_GENRE_CHIP',
  'REMOVE_GENRE_CHIP',
  'SET_LOWER_LIMIT_BUDGET',
  'SET_UPPER_LIMIT_BUDGET',
)

/**
 * RestaurantListコンテナ用Action
 */
export const Restaurants = createTypes('restaurants',
  async('FETCH'),
  'SET_QUERY',
  'REPLACE_RESTAURANTS',
  'ADD_RESTAURANTS',
)
export const Restaurant = createTypes('restaurant',
  'SET',
)


/**
 * RestaurantDetail用Action
 * Webなので、ここが入り口になりうるためListとは別のStoreで管理する
 */
export const RestaurantDetail = createTypes('restaurantDetail',
  async('FETCH'),
  'SET_TABS_VALUE',
  'SET_COMMON',
  'SET_TOP',
  'SET_PHOTO',
  'SET_REVIEWS',
  'SET_REVIEW',
)


/**
 * 汎用ERROR用Action
 */
export const Errors = createTypes('errors',
  'PUSH',
  'POP',
)


/**
 * 汎用Loading用Action
 */
export const Loading = createTypes('loading',
  'SET_NOW_LOADING',
  'SUCCESS',
  'FAILED',
)


export const Crud = createTypes('crud',
  async('LOAD'),
  async('SAVE'),
  async('UPDATE'),
  async('REMOVE')
)

/*
  types = {
    LOAD_REQUEST: 'my-app/module/LOAD_REQUEST',
    LOAD_SUCCESS: 'my-app/module/LOAD_SUCCESS',
    LOAD_FAIL: 'my-app/module/LOAD_FAIL',
    SAVE_REQUEST: 'my-app/module/SAVE_REQUEST',
    SAVE_SUCCESS: 'my-app/module/SAVE_SUCCESS',
    SAVE_FAIL: 'my-app/module/SAVE_FAIL',
    UPDATE_REQUEST: 'my-app/module/UPDATE_REQUEST',
    UPDATE_SUCCESS: 'my-app/module/UPDATE_SUCCESS',
    UPDATE_FAIL: 'my-app/module/UPDATE_FAIL',
    REMOVE_REQUEST: 'my-app/module/REMOVE_REQUEST',
    REMOVE_SUCCESS: 'my-app/module/REMOVE_SUCCESS',
    REMOVE_FAIL: 'my-app/module/REMOVE_FAIL'
  }
*/
