import { combineReducers } from 'redux';
import header from './header';
import auth from './auth';
import searchForm from './searchForm';
import restaurants from './restaurants';
import restaurantDetail from './restaurantDetail';
import errors from './errors';

const rootReducer = combineReducers({
  header,
  auth,
  searchForm,
  restaurants,
  restaurantDetail,
  errors,
});

export default rootReducer;
