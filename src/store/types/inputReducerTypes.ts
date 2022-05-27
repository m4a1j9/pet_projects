export enum InputTypes {
	SET_LOGIN = 'SET_LOGIN',
	SET_PASSWORD = 'SET_PASSWORD',
	SET_EMAIL = 'SET_EMAIL',
	SET_NAME = 'SET_NAME',
}

export interface IinputState {
	login: string
	password: string
	email: string
	name: string
}

interface IinputSetLogin {
	type: InputTypes.SET_LOGIN
	value: string
}

interface IinputSetPassword {
	type: InputTypes.SET_PASSWORD
	value: string
}

interface IinputSetEmail {
	type: InputTypes.SET_EMAIL
	value: string
}

interface IinputSetName {
	type: InputTypes.SET_NAME
	value: string
}

export type IinputAction =
	| IinputSetLogin
	| IinputSetPassword
	| IinputSetEmail
	| IinputSetName
