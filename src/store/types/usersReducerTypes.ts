export interface IusersState {
	users: IUser[]
	loading: boolean
	error: null | string
	currentUserName: string
	currentUserId: number
	currentUserColor: string
}
export interface Iaction {
	type: string
	payload: any
}
export interface IUser {
	color: string
	email: string
	id: string
	login: string
	password: string
	userName: string
}

export enum UsersAtionTypes {
	FETCH_USERS = 'FETCH_USERS',
	FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
	FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
	PUT_USER = 'PUT_USER',
	PUT_USER_SUCCESS = 'PUT_USER_SUCCESS',
	PUT_USER_ERROR = 'PUT_USER_ERROR',
	SET_CURRENT_NAME = 'SET_CURRENT_NAME',
	SET_CURRENT_ID = 'SET_CURRENT_ID',
	SET_CURRENT_COLOR = 'SET_CURRENT_COLOR',
}

interface IfetchUsersAction {
	type: UsersAtionTypes.FETCH_USERS
}

interface IfetchUsersActionSuccess {
	type: UsersAtionTypes.FETCH_USERS_SUCCESS
	payload: any[]
}

interface IfetchUsersActionError {
	type: UsersAtionTypes.FETCH_USERS_ERROR
	payload: string
}

interface IputUserAction {
	type: UsersAtionTypes.PUT_USER
}

interface IputUserActionSuccess {
	type: UsersAtionTypes.PUT_USER_SUCCESS
	payload: any[]
}

interface IputUserActionError {
	type: UsersAtionTypes.PUT_USER_ERROR
	payload: string
}

interface ISetCurrentNmae {
	type: UsersAtionTypes.SET_CURRENT_NAME
	payload: string
}

interface ISetCurrentId {
	type: UsersAtionTypes.SET_CURRENT_ID
	payload: number
}

interface ISetCurrentColor {
	type: UsersAtionTypes.SET_CURRENT_COLOR
	payload: string
}

export type IuserAction =
	| IfetchUsersAction
	| IfetchUsersActionSuccess
	| IfetchUsersActionError
	| IputUserAction
	| IputUserActionSuccess
	| IputUserActionError
	| ISetCurrentNmae
	| ISetCurrentId
	| ISetCurrentColor
