import React from 'react'
import Login from '../pages/Login'
import MainPage from '../pages/MainPage'
import Profile from '../pages/Profile'
import SignUp from '../pages/SignUp'
import { Links } from '../types/links'

interface RouteInt {
	path: string
	element: JSX.Element
}

export const privateRoutes: RouteInt[] = [
	{ path: Links.profile, element: <Profile /> },
	{ path: Links.mainPage, element: <MainPage /> },
	{ path: Links.any, element: <Profile /> },
]

export const publicRoutes: RouteInt[] = [
	{ path: Links.login, element: <Login /> },
	{ path: Links.signup, element: <SignUp /> },
	{ path: Links.mainPage, element: <MainPage /> },
	{ path: Links.any, element: <Login /> },
]
