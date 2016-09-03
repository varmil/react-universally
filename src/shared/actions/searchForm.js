import { createAction } from 'redux-actions'
import { SearchForm } from '../constants/ActionTypes'

export let setArea = createAction(SearchForm.SET_AREA, (value) => {
  return { area: value }
})

export let setGenre = createAction(SearchForm.SET_GENRE, (value) => {
  return { genre: value }
})

export let setLowerLimitBudget = createAction(SearchForm.SET_LOWER_LIMIT_BUDGET, (value) => {
  return { lowerLimitBudget: value }
})

export let setUpperLimitBudget = createAction(SearchForm.SET_UPPER_LIMIT_BUDGET, (value) => {
  return { upperLimitBudget: value }
})
