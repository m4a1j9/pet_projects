import React, {FC} from "react";
import Avatar from "../Avatar";
import {IMainProfile} from "./types";
import styles from "./styles.module.css";

const MiniProfile: FC<IMainProfile> = ({userName, avatar}) => {
    return (
        <div className={styles.main}>
            <p>{userName}</p>
            <Avatar picture={avatar.picture} mode={avatar.mode}></Avatar>
        </div>
    );
};

export default MiniProfile;
