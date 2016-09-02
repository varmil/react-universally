import { handleActions } from 'redux-actions'
import { Auth } from '../constants/ActionTypes'

const initialState = {
  isPrepared: false,
  isLoggedIn: false,
  isPremium: false,
};

export default handleActions({
  [Auth.SET_IS_LOGGED_IN]: (state, action) => ({
    ...state,
    isPrepared: action.payload.isPrepared,
    isLoggedIn: action.payload.isLoggedIn
  }),
}, initialState);
