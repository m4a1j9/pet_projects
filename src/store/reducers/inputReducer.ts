import {
	IinputAction,
	InputTypes,
	IinputState,
} from '../types/inputReducerTypes'

const defaultState: IinputState = {
	login: '',
	password: '',
	email: '',
	name: '',
}

export const inputReducer = (
	state = defaultState,
	action: IinputAction,
): IinputState => {
	switch (action.type) {
		case InputTypes.SET_LOGIN:
			return { ...state, login: action.value }

		case InputTypes.SET_PASSWORD:
			return { ...state, password: action.value }

		case InputTypes.SET_EMAIL:
			return { ...state, email: action.value }

		case InputTypes.SET_NAME:
			return { ...state, name: action.value }

		default:
			return state
	}
}
