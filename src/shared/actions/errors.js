import { createAction } from 'redux-actions'
import { Errors } from '../constants/ActionTypes'

export let push = createAction(Errors.PUSH)

export let pop = createAction(Errors.POP)
