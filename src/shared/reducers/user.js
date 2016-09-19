// ************************************************
// SSR時にサーバ側でreq.userをもとに基本情報をsetする
// ************************************************
import { handleActions } from 'redux-actions'
import { User } from '../constants/ActionTypes'


const initialState = {
  id: undefined,
}

export default handleActions({
  [User.SET]: (state, action) => ({
    ...action.payload,
  }),
  [User.SET_ID]: (state, action) => ({
    ...state,
    id: action.payload
  }),

}, initialState)
