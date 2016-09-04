import { createTypes, async } from 'redux-action-types'

export const Auth = createTypes('auth',
  'SET_IS_PREPARED',
  'SET_IS_LOGGED_IN',
)

export const SearchForm = createTypes('form',
  'SET_AREA',
  'SET_GENRE',
  'SET_LOWER_LIMIT_BUDGET',
  'SET_UPPER_LIMIT_BUDGET',
)

export const Restaurants = createTypes('restaurants',
  'REPLACE_RESTAURANTS',
  'ADD_RESTAURANTS',
)

export const Restaurant = createTypes('restaurant',
  'SET',
)

export const Crud = createTypes('crud',
  async('LOAD'),
  async('SAVE'),
  async('UPDATE'),
  async('REMOVE')
)

/*
  types = {
    LOAD: 'my-app/module/LOAD',
    LOAD_SUCCESS: 'my-app/module/LOAD_SUCCESS',
    LOAD_FAIL: 'my-app/module/LOAD_FAIL',
    SAVE: 'my-app/module/SAVE',
    SAVE_SUCCESS: 'my-app/module/SAVE_SUCCESS',
    SAVE_FAIL: 'my-app/module/SAVE_FAIL',
    UPDATE: 'my-app/module/UPDATE',
    UPDATE_SUCCESS: 'my-app/module/UPDATE_SUCCESS',
    UPDATE_FAIL: 'my-app/module/UPDATE_FAIL',
    REMOVE: 'my-app/module/REMOVE',
    REMOVE_SUCCESS: 'my-app/module/REMOVE_SUCCESS',
    REMOVE_FAIL: 'my-app/module/REMOVE_FAIL'
  }
*/
