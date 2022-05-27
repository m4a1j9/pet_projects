import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Links } from '../../types/links'
import { IDropListValue } from '../UI/DropList/types'
import DropMenu from '../UI/DropMenu'
import MiniProfile from '../UI/MiniProfile'
import styles from './styles.module.css'
import { IHeader } from './types'
import {
	AuthStateType,
	AuthAtionTypes,
} from '../../store/types/authReducerTypes'
import { LocalStorage, LS, LSMode } from '../../types/localStorage'
import MyButton from '../UI/MyButton'

const Header: FC<IHeader> = ({ userName, userAvatar }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const headerDropMenu: IDropListValue[] = [
		{
			title: 'Profile',
			action() {
				navigate(Links.profile, { replace: true })
			},
		},
		{
			title: 'Settings',
			action() {
				navigate(Links.settings, { replace: true })
			},
		},
		{
			title: 'Log Out',
			action() {
				dispatch<AuthStateType>({
					type: AuthAtionTypes.LOGOUT,
					isAuth: false,
				})
				LS(LocalStorage.isAuth, '', LSMode.remove)
				navigate(Links.login, { replace: true })
			},
		},
	]

	return (
		<div className={styles.header}>
			<Link to={Links.mainPage} className={styles.title}>React app</Link>
			{LS(LocalStorage.isAuth) ? (
				<div className={styles.profile_wrap}>
					<MiniProfile
						userName={userName}
						avatar={userAvatar}
					></MiniProfile>
					<DropMenu selectList={headerDropMenu}></DropMenu>
				</div>
			) : (
				<Link to={Links.login}>Log in</Link>
			)}
		</div>
	)
}

export default Header
