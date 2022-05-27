import axios from 'axios'
import { Dispatch } from 'redux'
import { IHintsState } from '../store/types/hintsReducerTypes'
import { UsersAtionTypes, IuserAction } from '../store/types/usersReducerTypes'

export const signUpUser = (
	login: string,
	password: string,
	email: string,
	name: string,
) => {
	return async (dispatch: Dispatch<IuserAction>) => {
		try {
			dispatch({ type: UsersAtionTypes.PUT_USER })
			const response: any  = await axios
				.post<IHintsState[]>(
					'https://625141c0e3e5d24b342af433.mockapi.io/multiBase/users/',
					{
						login: login,
						password: password,
						email: email,
						userName: name,
					},
				)
				.then(response => {
					dispatch({
						type: UsersAtionTypes.PUT_USER_SUCCESS,
						payload: response.data,
					})
					console.log(response.data)
				})
		} catch (e) {
			console.log(e)
			dispatch({
				type: UsersAtionTypes.PUT_USER_ERROR,
				payload: 'ERROR ON DOWNLOAD',
			})
		}
	}
}
