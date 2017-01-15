import { combineReducers } from 'redux';
import user from './user';
import auth from './auth';
import searchForm from './searchForm';
import restaurants from './restaurants';
import restaurantDetail from './restaurantDetail';
import errors from './errors';
import loading from './loading';

const rootReducer = combineReducers({
  user,
  auth,
  searchForm,
  restaurants,
  restaurantDetail,
  errors,
  loading,
});

export default rootReducer;
