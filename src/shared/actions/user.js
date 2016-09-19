import { createAction } from 'redux-actions'
import { User } from '../constants/ActionTypes'

export let setId = createAction(User.SET_ID, (value) => value)

export let set = createAction(User.SET, (obj) => obj)
