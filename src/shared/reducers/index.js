import { combineReducers } from 'redux';
import auth from './auth';
import searchForm from './searchForm';
import restaurants from './restaurants';
import restaurantDetail from './restaurantDetail';

const rootReducer = combineReducers({
  auth,
  searchForm,
  restaurants,
  restaurantDetail,
});

export default rootReducer;
