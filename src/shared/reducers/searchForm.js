import { handleActions } from 'redux-actions'
import { SearchForm } from '../constants/ActionTypes'

const initialState = {
  area: '',
  genre: '',
  lowerLimitBudget: undefined,
  upperLimitBudget: undefined,
};

export default handleActions({
  [SearchForm.SET_AREA]: (state, action) => ({
    ...state,
    area: action.payload.area
  }),
  [SearchForm.SET_GENRE]: (state, action) => ({
    ...state,
    genre: action.payload.genre
  }),
  [SearchForm.SET_LOWER_LIMIT_BUDGET]: (state, action) => ({
    ...state,
    lowerLimitBudget: action.payload.lowerLimitBudget
  }),
  [SearchForm.SET_UPPER_LIMIT_BUDGET]: (state, action) => ({
    ...state,
    upperLimitBudget: action.payload.upperLimitBudget
  }),
}, initialState);
