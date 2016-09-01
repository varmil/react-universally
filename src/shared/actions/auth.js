import ActionTypes from '../constants/ActionTypes'

export function setIsLoggedIn(bool) {
  return { type: ActionTypes.AUTH_SET_IS_LOGGED_IN, bool }
}
