import { createAction } from 'redux-actions'
import { SearchForm } from '../constants/ActionTypes'

export let setAreaText = createAction(SearchForm.SET_AREA_TEXT, (value) => value)
export let setGenreText = createAction(SearchForm.SET_GENRE_TEXT, (value) => value)

export let addAreaChip = createAction(SearchForm.ADD_AREA_CHIP, (value) => value)
export let removeAreaChip = createAction(SearchForm.REMOVE_AREA_CHIP, (value) => value)

export let addGenreChip = createAction(SearchForm.ADD_GENRE_CHIP, (value) => value)
export let removeGenreChip = createAction(SearchForm.REMOVE_GENRE_CHIP, (value) => value)

export let setLowerLimitBudget = createAction(SearchForm.SET_LOWER_LIMIT_BUDGET, (value) => {
  return { lowerLimitBudget: value }
})
export let setUpperLimitBudget = createAction(SearchForm.SET_UPPER_LIMIT_BUDGET, (value) => {
  return { upperLimitBudget: value }
})
