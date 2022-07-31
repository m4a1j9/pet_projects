import React, { FC } from "react";
import styles from "./styles.module.css";
import { IHint } from "./types";

const Hint: FC<IHint> = ({ children }) => {
    return <div className={styles.hint}>{children}</div>;
};

export default Hint;
