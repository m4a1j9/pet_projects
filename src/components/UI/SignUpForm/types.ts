export interface Iform {
	inputActionTypes: IinputActionTypes
	buttonAction: () => any
	children?: React.ReactNode | string
}

interface IinputActionTypes {
	login: (event: React.ChangeEvent<HTMLInputElement>) => void
	password: (event: React.ChangeEvent<HTMLInputElement>) => void
	email: (event: React.ChangeEvent<HTMLInputElement>) => void
	name: (event: React.ChangeEvent<HTMLInputElement>) => void
}