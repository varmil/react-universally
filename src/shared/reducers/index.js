import { combineReducers } from 'redux';
import auth from './auth';
import searchForm from './searchForm';

const rootReducer = combineReducers({
  auth,
  searchForm
});

export default rootReducer;
