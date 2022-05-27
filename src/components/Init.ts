import { useDispatch } from 'react-redux'
import { AuthAtionTypes, AuthStateType } from '../store/types/authReducerTypes'
import { IuserAction, UsersAtionTypes } from '../store/types/usersReducerTypes'
import { LocalStorage, LS } from '../types/localStorage'

const Init = () => {
	const dispatch = useDispatch()

	if (LS(LocalStorage.isAuth)) {
		dispatch<IuserAction>({
			type: UsersAtionTypes.SET_CURRENT_NAME,
			payload: LS(LocalStorage.currentUserName),
		})
		dispatch<IuserAction>({
			type: UsersAtionTypes.SET_CURRENT_ID,
			payload: LS(LocalStorage.currentUserId),
		})
		dispatch<IuserAction>({
			type: UsersAtionTypes.SET_CURRENT_COLOR,
			payload: LS(LocalStorage.currentUserColor)
		})
		dispatch<AuthStateType>({
			type: AuthAtionTypes.LOGIN,
			isAuth: true,
		})
	}

	console.log('init complete')
}

export default Init
