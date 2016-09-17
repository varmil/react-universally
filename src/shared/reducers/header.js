import { handleActions } from 'redux-actions'
import { Header } from '../constants/ActionTypes'

const initialState = {
  title: undefined,
  leftIcon: undefined,
};

export default handleActions({
  [Header.SET_TITLE]: (state, action) => ({
    ...state,
    title: action.payload
  }),
  [Header.SET_LEFT_ICON]: (state, action) => ({
    ...state,
    leftIcon: action.payload
  }),
}, initialState);
