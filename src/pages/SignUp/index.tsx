import validator from 'email-validator'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signUpUser } from '../../asincActions/signUpUser'
import SignUpForm from '../../components/UI/SignUpForm'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { HintCaseType, HintsActions } from '../../store/types/hintsReducerTypes'
import { IinputAction, InputTypes } from '../../store/types/inputReducerTypes'

const SignUp = () => {
	const dispatch = useDispatch()
	const { users, loading, error } = useTypedSelector(
		(state) => state.usersReducer,
	)
	const { login, password, email, name } = useTypedSelector(
		(state) => state.inputReducer,
	)

	function putData() {
		dispatch<any>(signUpUser(login, password, email, name))
	}

	function setLogin(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length > 5) {
			dispatch<IinputAction>({
				type: InputTypes.SET_LOGIN,
				value: event.target.value,
			})
			dispatch<HintCaseType>({
				type: HintsActions.SHOW_LOGIN_HINT,
				loginHint: false,
			})
		} else {
			dispatch<HintCaseType>({
				type: HintsActions.SHOW_LOGIN_HINT,
				loginHint: true,
			})
		}
	}

	function setEmail(event: React.ChangeEvent<HTMLInputElement>) {
		if (validator.validate(event.target.value)) {
			dispatch<IinputAction>({
				type: InputTypes.SET_EMAIL,
				value: event.target.value,
			})
			dispatch<HintCaseType>({
				type: HintsActions.SHOW_EMAIL_HINT,
				emailHint: false,
			})
		} else {
			dispatch<HintCaseType>({
				type: HintsActions.SHOW_EMAIL_HINT,
				emailHint: true,
			})
		}
	}

	function setPassword(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length > 5) {
			dispatch<IinputAction>({
				type: InputTypes.SET_PASSWORD,
				value: event.target.value,
			})
			dispatch<HintCaseType>({
				type: HintsActions.SHOW_PASSWORD_HINT,
				passwordHint: false,
			})
		} else {
			dispatch<HintCaseType>({
				type: HintsActions.SHOW_PASSWORD_HINT,
				passwordHint: true,
			})
		}
	}

	function setName(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length > 5) {
			dispatch<IinputAction>({
				type: InputTypes.SET_NAME,
				value: event.target.value,
			})
			dispatch<HintCaseType>({
				type: HintsActions.SHOW_NAME_HINT,
				nameHint: false,
			})
		} else {
			dispatch<HintCaseType>({
				type: HintsActions.SHOW_NAME_HINT,
				nameHint: true,
			})
		}
	}

	return (
		<div>
			<SignUpForm
				inputActionTypes={{
					login: setLogin,
					password: setPassword,
					email: setEmail,
					name: setName,
				}}
				buttonAction={putData}
			></SignUpForm>
			{loading ? <h1>...loading</h1> : null}
			{error ? <h1>{error}</h1> : null}
		</div>
	)
}

export default SignUp
