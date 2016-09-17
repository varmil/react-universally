import { createAction } from 'redux-actions'
import { Header } from '../constants/ActionTypes'

export let setTitle = createAction(Header.SET_TITLE, (node) => node)

export let setLeftIcon = createAction(Header.SET_LEFT_ICON, (node) => node)
