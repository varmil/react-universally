import { handleActions } from 'redux-actions'
import { Loading } from '../constants/ActionTypes'

const initialState = {
  nowLoading: false,
};

export default handleActions({
  [Loading.SET_NOW_LOADING]: (state, action) => ({
    ...state,
    nowLoading: action.payload
  }),
}, initialState);
