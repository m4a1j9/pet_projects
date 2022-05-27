import {
	UsersAtionTypes,
	IuserAction,
	IusersState,
} from '../types/usersReducerTypes'

const defaultState: IusersState = {
	users: [],
	loading: false,
	error: null,
	currentUserName: 'user_name',
	currentUserId: 0,
	currentUserColor: 'white',
}

export const usersReducer = (
	state = defaultState,
	action: IuserAction,
): IusersState => {
	switch (action.type) {
		case UsersAtionTypes.FETCH_USERS:
			return { ...state, loading: true, error: null, users: [] }

		case UsersAtionTypes.FETCH_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				users: action.payload,
			}

		case UsersAtionTypes.FETCH_USERS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
				users: [],
			}

		case UsersAtionTypes.PUT_USER:
			return { ...state, loading: true, error: null }

		case UsersAtionTypes.PUT_USER_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				users: action.payload,
			}

		case UsersAtionTypes.PUT_USER_ERROR:
			return { ...state, loading: false, error: action.payload }

		case UsersAtionTypes.SET_CURRENT_NAME:
			return {
				...state,
				loading: false,
				error: null,
				currentUserName: action.payload,
			}

		case UsersAtionTypes.SET_CURRENT_ID:
			return {
				...state,
				loading: false,
				error: null,
				currentUserId: action.payload,
			}

		case UsersAtionTypes.SET_CURRENT_COLOR:
			return {
				...state,
				loading: false,
				error: null,
				currentUserColor: action.payload,
			}

		default:
			return state
	}
}
