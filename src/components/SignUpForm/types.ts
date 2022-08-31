export interface IForm {
    inputActionTypes: IinputActionTypes
    buttonProps: IButtonProps
    children?: React.ReactNode | string
}

interface IButtonProps {
    buttonAction: () => any
    isDisButton: boolean
}

interface IinputActionTypes {
    login: (event: React.ChangeEvent<HTMLInputElement>) => void
    password: (event: React.ChangeEvent<HTMLInputElement>) => void
    email: (event: React.ChangeEvent<HTMLInputElement>) => void
    name: (event: React.ChangeEvent<HTMLInputElement>) => void
}
