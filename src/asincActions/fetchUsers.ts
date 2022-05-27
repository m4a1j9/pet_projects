import axios from 'axios'
import { Dispatch } from 'redux'
import { IHintsState } from '../store/types/hintsReducerTypes'
import { UsersAtionTypes, IuserAction } from '../store/types/usersReducerTypes'

export const fetchUsers = () => {
	return async (dispatch: Dispatch<IuserAction>) => {
		try {
			dispatch({ type: UsersAtionTypes.FETCH_USERS })
			const response = await axios
				.get<IHintsState[]>(
					'https://625141c0e3e5d24b342af433.mockapi.io/multiBase/users',
				)
				.then((response) => {
					dispatch({
						type: UsersAtionTypes.FETCH_USERS_SUCCESS,
						payload: response.data,
					})
					console.log(response.data)
				})
		} catch (e) {
			console.log(e)
			dispatch({
				type: UsersAtionTypes.FETCH_USERS_ERROR,
				payload: 'ERROR ON DOWNLOAD',
			})
		}
	}
}
