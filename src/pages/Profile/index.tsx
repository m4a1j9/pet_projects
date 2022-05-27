import React from 'react'
import { useDispatch } from 'react-redux'
import Avatar from '../../components/UI/Avatar'
import { AvatarMode } from '../../components/UI/Avatar/types'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IusersState } from '../../store/types/usersReducerTypes'
import styles from './styles.module.css'

const Profile = () => {
	const { loading, error } = useTypedSelector(
		(state) => state.usersReducer,
	)

	const { currentUserName, currentUserColor }: IusersState = useTypedSelector(
		(state) => state.usersReducer,
	)
	if (loading) {
		return <h1>loading</h1>
	}

	if (error) {
		return <h1>error</h1>
	}

	return (
		<div className={styles.main}>
			<div className={styles.profile}>
				<Avatar picture={currentUserColor} mode={AvatarMode.circle}></Avatar>
			</div>
			<p>Welcome</p>
		</div>
	)
}

export default Profile
