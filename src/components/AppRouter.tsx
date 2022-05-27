import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { privateRoutes, publicRoutes } from '../router'
import Layout from './Layout'

const AppRouter = () => {
	const isAuth = useTypedSelector((state) => state.authReducer.isAuth)

	return isAuth ? (
		<Routes>
			<Route path="/" element={<Layout />}>
				{privateRoutes.map((route) => (
					<Route
						key={route.path}
						path={route.path}
						element={route.element}
					/>
				))}
			</Route>
		</Routes>
	) : (
		<Routes>
			<Route path="/" element={<Layout />}>
				{publicRoutes.map((route) => (
					<Route
						key={route.path}
						path={route.path}
						element={route.element}
					/>
				))}
			</Route>
		</Routes>
	)
}

export default AppRouter
