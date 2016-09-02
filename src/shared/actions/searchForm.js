import { createAction } from 'redux-actions'
import { SearchForm } from '../constants/ActionTypes'

export let setArea = createAction(SearchForm.SET_AREA, (value) => {
  return { area: value }
})

export let setGenre = createAction(SearchForm.SET_GENRE, (value) => {
  return { genre: value }
})
