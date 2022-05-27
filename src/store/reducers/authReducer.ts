import { AuthState, AuthAtionTypes, AuthStateType } from '../types/authReducerTypes'

const defaultState: AuthState = {
	isAuth: false,
}

export const authReducer = (
	state = defaultState,
	action: AuthStateType,
): AuthState => {
	switch (action.type) {
		case AuthAtionTypes.LOGIN:
			return { ...state, isAuth: true }

		case AuthAtionTypes.LOGOUT:
			return { ...state, isAuth: false }

		default:
			return state
	}
}
