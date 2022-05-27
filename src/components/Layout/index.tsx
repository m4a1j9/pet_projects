import React from 'react'
import { Outlet } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IusersState } from '../../store/types/usersReducerTypes'
import Header from '../Header'
import { IAvatar, AvatarMode } from '../UI/Avatar/types'
import styles from './styles.module.css'

const Layout = () => {
	const { currentUserName, currentUserColor }: IusersState = useTypedSelector(
		(state) => state.usersReducer,
	)

	const avatarOptions: IAvatar = {
		picture: currentUserColor,
		mode: AvatarMode.rectangle,
	}

	return (
		<main className={styles.main}>
			<Header
				userName={currentUserName}
				userAvatar={avatarOptions}
			></Header>
			<Outlet />
		</main>
	)
}

export default Layout
