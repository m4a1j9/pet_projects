import React, { FC } from 'react'
import styles from './styles.module.css'
import { IDropList, IDropListValue } from './types'

const DropList: FC<IDropList> = ({ dropList }) => {
	return (
		<ul className={styles.main}>
			{dropList.map((el: IDropListValue, i) => (
				<button onClick={el.action} key={i} className={styles.link}>
					{el.title}
				</button>
			))}
		</ul>
	)
}

export default DropList
