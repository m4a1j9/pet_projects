import React, { FC } from "react";
import styles from "./styles.module.css";
import { InputInt } from "./types";

const MyInput: FC<InputInt> = ({ type, actionType, placeholder }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={styles.myInput}
            onChange={(event) => {
                actionType(event);
            }}
        />
    );
};

export default MyInput;
