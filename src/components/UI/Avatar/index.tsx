import React, { FC } from "react";
import styles from "./styles.module.css";
import { IAvatar } from "./types";

const Avatar: FC<IAvatar> = ({ picture, mode }) => {
    return (
        <div className={mode} style={{ background: picture }}>
            {picture}
        </div>
    );
};

export default Avatar;
