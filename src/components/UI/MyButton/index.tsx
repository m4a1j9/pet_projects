import React, { FC } from "react";

import styles from "./styles.module.css";
import { ButtonInt } from "./types";

export const MyButton: FC<ButtonInt> = ({ children, action, isDis }) => {
    return (
        <button
            className={styles.button}
            onClick={(event) => {
                event.preventDefault();
                return action(event);
            }}
            disabled={isDis ?? false}
        >
            {children}
        </button>
    );
};

export default MyButton;
