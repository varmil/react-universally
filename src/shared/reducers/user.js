// ************************************************
// SSR時にサーバ側でreq.userをもとに基本情報をsetする
// ************************************************
import { handleActions } from 'redux-actions'
import { User } from '../constants/ActionTypes'


const initialState = {}

export default handleActions({
  [User.SET]: (state, action) => ({
    ...state,
  }),
}, initialState)
