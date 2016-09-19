import { combineReducers } from 'redux';
import user from './user';
import auth from './auth';
import searchForm from './searchForm';
import restaurants from './restaurants';
import restaurantDetail from './restaurantDetail';
import errors from './errors';

const rootReducer = combineReducers({
  user,
  auth,
  searchForm,
  restaurants,
  restaurantDetail,
  errors,
});

export default rootReducer;
