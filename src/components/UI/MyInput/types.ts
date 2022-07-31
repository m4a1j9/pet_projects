export interface InputInt {
    type: string
    actionType: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}
