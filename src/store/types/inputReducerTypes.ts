export enum InputTypes {
    SET_LOGIN = "SET_LOGIN",
    SET_PASSWORD = "SET_PASSWORD",
    SET_EMAIL = "SET_EMAIL",
    SET_NAME = "SET_NAME",
}

export interface IinputState {
    login: string
    password: string
    email: string
    name: string
}
