import { combineReducers } from 'redux';
import auth from './auth';
import searchForm from './searchForm';
import restaurants from './restaurants';

const rootReducer = combineReducers({
  auth,
  searchForm,
  restaurants
});

export default rootReducer;
