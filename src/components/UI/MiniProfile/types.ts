import React from 'react'
import { AvatarMode } from '../Avatar/types'

export interface IMainProfile {
	children?: React.ReactChild
	userName: string
	avatar: IAvatar
}

interface IAvatar {
	picture: string
	mode: AvatarMode
}