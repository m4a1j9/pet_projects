import React from "react";

export interface IDropList {
    children?: React.ReactChild
    dropList: IDropListValue[]
}

export interface IDropListValue {
    action: LogOutFunction
    title: string
}

export type LogOutFunction = () => void
