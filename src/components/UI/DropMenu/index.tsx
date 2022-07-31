import React, { FC } from "react";
import { IDropMenu } from "./types";
import styles from "./styles.module.css";
import DropList from "../DropList";

const DropMenu: FC<IDropMenu> = ({ selectList }) => {
    return (
        <div className={styles.main}>
            <div className={styles.points}></div>
            <div className={styles.dropList}>
                <DropList dropList={selectList}></DropList>
            </div>
        </div>
    );
};

export default DropMenu;
