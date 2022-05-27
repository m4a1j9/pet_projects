export interface AuthState {
	isAuth: boolean
}

export enum AuthAtionTypes {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
}

interface IauthLogin {
	type: AuthAtionTypes.LOGIN
	isAuth: boolean
}

interface IauthLogout {
	type: AuthAtionTypes.LOGOUT
	isAuth: boolean
}

export type AuthStateType = IauthLogin | IauthLogout