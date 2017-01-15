import { take, takeEvery, put, call, fork, select } from 'redux-saga/effects'
import { Restaurants } from '../constants/ActionTypes'
import * as errorsActions from '../actions/errors'
import * as rstsAction from '../actions/restaurants'
import API from '../api'


function* fetchRstList(query, params) {
  try {
    const { data } = yield call(API.fetchRestaurantList, query, params)
    yield put(rstsAction.replaceRestaurants(data))
  } catch (e) {
    yield put(errorsActions.push(e))
  }
}


/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// レストラン一覧（検索結果）フェッチ
function* watchFetchRstList() {
  while(true) {
    const { payload } = yield take(Restaurants.FETCH_REQUEST)
    yield fork(fetchRstList, payload.query, payload.params)
  }
}


export default function* root() {
  yield [
    fork(watchFetchRstList),
  ]
}
