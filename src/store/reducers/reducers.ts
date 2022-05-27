import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { usersReducer } from './usersReducer'
import { inputReducer } from './inputReducer'
import { hintsReducer } from './hintsReducer'

export const rootReducer = combineReducers({
	authReducer,
	usersReducer,
	inputReducer,
	hintsReducer,
})

export type RootState = ReturnType<typeof rootReducer>