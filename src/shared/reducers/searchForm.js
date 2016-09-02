import { handleActions } from 'redux-actions'
import { SearchForm } from '../constants/ActionTypes'

const initialState = {
  area: '',
  genre: '',
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
}, initialState);
