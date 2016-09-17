import { handleActions } from 'redux-actions'
import { Header } from '../constants/ActionTypes'

const initialState = {
  title: undefined,
  leftIcon: undefined,
};

export default handleActions({
  [Header.SET_TITLE]: (state, action) => ({
    ...state,
    isPrepared: action.payload.isPrepared
  }),
  [Header.SET_LEFT_ICON]: (state, action) => ({
    ...state,
    isLoggedIn: action.payload.isLoggedIn
  }),
}, initialState);
