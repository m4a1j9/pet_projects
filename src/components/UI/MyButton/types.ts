import React from "react";

export interface ButtonInt {
    children?: React.ReactNode | string
    action: React.MouseEventHandler<HTMLButtonElement>
    isDis?: boolean
}
