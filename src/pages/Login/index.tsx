import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { useDispatch } from 'react-redux'
import { fetchUsers } from '../../asincActions/fetchUsers'
import Header from '../../components/Header'
import Hint from '../../components/UI/Hint'
import LogInForm from '../../components/UI/LogInForm'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
	AuthAtionTypes,
	AuthState,
	AuthStateType,
} from '../../store/types/authReducerTypes'
import {
	HintCaseType,
	HintsActions,
	IHintsState,
} from '../../store/types/hintsReducerTypes'
import {
	IinputAction,
	IinputState,
	InputTypes,
} from '../../store/types/inputReducerTypes'
import {
	IuserAction,
	UsersAtionTypes,
	IUser,
	IusersState,
} from '../../store/types/usersReducerTypes'
import { LocalStorage, LS, LSMode } from '../../types/localStorage'
import { useNavigate } from 'react-router-dom'
import { Links } from '../../types/links'

const Login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { users, loading, error } = useTypedSelector(
		(state) => state.usersReducer,
	)
	const userLogin: IinputState = useTypedSelector(
		(state) => state.inputReducer,
	)
	const isAuth: AuthState = useTypedSelector((state) => state.authReducer)
	const hints: IHintsState = useTypedSelector((state) => state.hintsReducer)

	function checkLogin() {
		users.forEach((user: IUser) => {
			if (
				userLogin.login === user.login &&
				userLogin.password === user.password
			) {
				dispatch<AuthStateType>({
					type: AuthAtionTypes.LOGIN,
					isAuth: true,
				})
				LS(LocalStorage.isAuth, true, LSMode.set)
				LS(LocalStorage.currentUserName, user.login, LSMode.set)
				LS(LocalStorage.currentUserId, user.id, LSMode.set)
				LS(LocalStorage.currentUserColor, user.color, LSMode.set)

				dispatch<IuserAction>({
					type: UsersAtionTypes.SET_CURRENT_NAME,
					payload: user.login,
				})
				dispatch<IuserAction>({
					type: UsersAtionTypes.SET_CURRENT_ID,
					payload: +user.id,
				})
				dispatch<IuserAction>({
					type: UsersAtionTypes.SET_CURRENT_COLOR,
					payload: user.color,
				})

				navigate(Links.profile, { replace: true })
			}
		})

		if (isAuth.isAuth) {
			dispatch<HintCaseType>({
				type: HintsActions.SHOW_ENTER_HINT,
				enterHint: false,
			})
		} else {
			dispatch<HintCaseType>({
				type: HintsActions.SHOW_ENTER_HINT,
				enterHint: true,
			})
		}
	}

	useEffect(() => {
		dispatch<any>(fetchUsers())
	}, [])

	function setLogin(event: React.ChangeEvent<HTMLInputElement>) {
		dispatch<IinputAction>({
			type: InputTypes.SET_LOGIN,
			value: event.target.value,
		})
	}

	function setPassword(event: React.ChangeEvent<HTMLInputElement>) {
		dispatch<IinputAction>({
			type: InputTypes.SET_PASSWORD,
			value: event.target.value,
		})
	}

	if (loading) {
		return <h1>...loading</h1>
	}

	if (error) {
		return <h1>{error}</h1>
	}

	return (
		<div>
			<div className={styles.loginForm}>
				<LogInForm
					inputActionTypes={{
						login: setLogin,
						password: setPassword,
					}}
					buttonAction={checkLogin}
				></LogInForm>
			</div>
			{hints.enterHint ? <Hint>uncorrect login or password</Hint> : null}
		</div>
	)
}

export default Login
