import { IAvatar } from "../UI/Avatar/types";

export interface IHeader {
    userName: string
    children?: React.ReactChild
    userAvatar: IAvatar
}
