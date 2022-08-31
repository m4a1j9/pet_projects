import React from "react";

export interface IAvatar {
    children?: React.ReactChild
    picture: string
    mode: "rectangle" | "circle"
}
