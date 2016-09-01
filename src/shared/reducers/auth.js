import ActionTypes from '../constants/ActionTypes';

const initialState = {
  isPrepared: false,
  isLoggedIn: false,
  isPremium: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.AUTH_SET_IS_LOGGED_IN:
      return {
        ...state,
        isPrepared: action.value,
        isLoggedIn: action.value
      };
    default:
      return state;
  }
}
