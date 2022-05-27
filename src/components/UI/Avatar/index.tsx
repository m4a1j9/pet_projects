import React, { FC } from 'react'
import styles from './styles.module.css'
import { IAvatar, AvatarMode } from './types'

const Avatar: FC<IAvatar> = ({ picture, mode }) => {

	const classMode = (mode: AvatarMode) => {
		if (mode === AvatarMode.rectangle) {
			return styles.rectangle
		} else if (mode === AvatarMode.circle) {
			return styles.circles
		}
		return styles.rectangle
	}

	return (
		<div className={classMode(mode)} style={{ background: picture }}>
			{picture}
		</div>
	)
}

export default Avatar
