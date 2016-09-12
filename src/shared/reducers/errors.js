import { handleActions } from 'redux-actions'
import { Errors } from '../constants/ActionTypes'

const initialState = []


export default handleActions({
  [Errors.PUSH]: (state, action) => {
    const payload = action.payload
    const obj = {
      message: payload.message,
      data: payload.response.data
    }
    return state.concat(obj)
  },

  [Errors.POP]: (state, action) => state.pop(),
}, initialState);
