import React from "react";

export interface IMainProfile {
    children?: React.ReactChild
    userName: string
    avatar: IAvatar
}

interface IAvatar {
    picture: string
    mode: "circle" | "rectangle"
}
