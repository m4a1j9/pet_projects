import React, { FC } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import styles from './styles.module.css'
import { ButtonInt } from './types'

export const MyButton: FC<ButtonInt> = ({ children, action }) => {
	const state = useTypedSelector((state) => state)
	return (
		<button
			className={styles.button}
			onClick={(event) => {
				event.preventDefault()
				return action(event)
			}}
		>
			{children}
		</button>
	)
}

export default MyButton
