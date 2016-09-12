import { handleActions } from 'redux-actions'
import { SearchForm } from '../constants/ActionTypes'

const initialState = {
  // ユーザが入力中の文字列
  areaText: '',
  genreText: '',
  // 確定後の検索候補
  areaChip: [],
  genreChip: [],
  // 予算
  lowerLimitBudget: undefined,
  upperLimitBudget: undefined,
};

export default handleActions({
  [SearchForm.SET_AREA_TEXT]: (state, action) => ({
    ...state,
    areaText: action.payload
  }),
  [SearchForm.SET_GENRE_TEXT]: (state, action) => ({
    ...state,
    genreText: action.payload
  }),

  [SearchForm.ADD_AREA_CHIP]: (state, action) => ({
    ...state,
    areaChip: state.areaChip.concat(action.payload)
  }),
  [SearchForm.REMOVE_AREA_CHIP]: (state, action) => ({
    ...state,
    areaChip: state.areaChip.filter(chip => chip !== action.payload)
  }),

  [SearchForm.ADD_GENRE_CHIP]: (state, action) => ({
    ...state,
    genreChip: state.genreChip.concat(action.payload)
  }),
  [SearchForm.REMOVE_GENRE_CHIP]: (state, action) => ({
    ...state,
    genreChip: state.genreChip.filter(chip => chip !== action.payload)
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
