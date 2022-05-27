import React from 'react'

export interface IAvatar {
	children?: React.ReactChild
	picture: string
	mode: AvatarMode
}

export enum AvatarMode {
	rectangle = 'rectangle',
	circle = 'circle'
}