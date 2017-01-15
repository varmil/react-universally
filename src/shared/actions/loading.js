import { createAction } from 'redux-actions'
import { Loading } from '../constants/ActionTypes'

export let setNowLoading = createAction(Loading.SET_NOW_LOADING, (bool) => bool)
export let success = createAction(Loading.SUCCESS)
export let failed = createAction(Loading.FAILED)
