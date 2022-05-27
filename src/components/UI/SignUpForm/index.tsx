import React, { FC } from 'react'
import { Links } from '../../../types/links'
import MyButton from '../MyButton'
import MyInput from '../MyInput'
import MyLink from '../MyLink'
import { Iform } from './types'
import { IHintsState } from '../../../store/types/hintsReducerTypes'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Hint from '../Hint'

const SignUpForm: FC<Iform> = ({
	inputActionTypes,
	buttonAction,
	children,
}) => {
	const { emailHint, loginHint, nameHint, passwordHint }: IHintsState =
		useTypedSelector((state) => state.hintsReducer)

	return (
		<div>
			<h1>Sign up</h1>
			<form>
				<MyInput
					type="text"
					actionType={inputActionTypes.name}
					placeholder="name"
				/>
				{nameHint ? (
					<Hint>The lenght of the name must be greater than 5</Hint>
				) : null}

				<MyInput
					type="text"
					actionType={inputActionTypes.login}
					placeholder="login"
				/>
				{loginHint ? (
					<Hint>The lenght of the name must be greater than 5</Hint>
				) : null}

				<MyInput
					type="password"
					actionType={inputActionTypes.password}
					placeholder="password"
				/>
				{passwordHint ? (
					<Hint>The lenght of the password must be greater than 5</Hint>
				) : null}

				<MyInput
					type="email"
					actionType={inputActionTypes.email}
					placeholder="email"
				/>
				{emailHint ? (
					<Hint>The email must contain @ and domain</Hint>
				) : null}

				<MyButton action={buttonAction}>Sign up</MyButton>
				<MyLink link={Links.login}>Log in?</MyLink>
				{children}
			</form>
		</div>
	)
}

export default SignUpForm
