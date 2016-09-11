import { combineReducers } from 'redux';
import auth from './auth';
import searchForm from './searchForm';
import restaurants from './restaurants';
import restaurantDetail from './restaurantDetail';
import errors from './errors';

const rootReducer = combineReducers({
  auth,
  searchForm,
  restaurants,
  restaurantDetail,
  errors,
});

export default rootReducer;
