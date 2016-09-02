import { createAction } from 'redux-actions'
import { Auth } from '../constants/ActionTypes'

export let setIsPrepared = createAction(Auth.SET_IS_PREPARED, (bool) => {
  return { isPrepared: bool }
})

export let setIsLoggedIn = createAction(Auth.SET_IS_LOGGED_IN, (bool) => {
  return { isLoggedIn: bool }
})
