import { take, takeEvery, put, call, fork, select } from 'redux-saga/effects'
import { Restaurants } from '../constants/ActionTypes'
import * as errorsAction from '../actions/errors'
import * as rstsAction from '../actions/restaurants'
import * as loadingAction from '../actions/loading'
import API from '../api'


// 汎用FETCH
function* fetchBase(apiFn, onSuccess, onFailed, query, params) {
    yield put(loadingAction.setNowLoading(true))

    try {
        const { data } = yield call(apiFn, query, params)
        yield put(loadingAction.success())
        yield call(onSuccess, data)
    }

    catch (e) {
        yield put(loadingAction.failed())
        yield call(onFailed, e)
    }

    finally {
        yield put(loadingAction.setNowLoading(false))
    }
}


function* fetchRstList(query, params) {
    const onSuccess = function*(data) {
        yield put(rstsAction.replaceRestaurants(data))
    }
    const onFailed = function*(e) {
        yield put(errorsAction.push(e))
    }

    yield call(
        fetchBase,
        API.fetchRestaurantList,
        onSuccess,
        onFailed,
        query,
        params)
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
