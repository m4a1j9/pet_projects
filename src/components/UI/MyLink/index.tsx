import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Links } from '../../../types/links'
import styles from './styles.module.css'
import { ImyLink } from './types'

const MyLink: FC<ImyLink> = ({ children, link }) => {
	return (
		<Link className={styles.link} to={link}>{children}</Link>
	)
}

export default MyLink
