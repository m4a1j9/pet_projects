import React from "react";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "../../hooks/redux";
import { userAPI } from "../../services/UserService";
import Header from "../Header";
import { IAvatar } from "../UI/Avatar/types";
import styles from "./styles.module.css";

const Layout = () => {
    const { currentUserId } = useTypedSelector((state) => state.user);
    const { data: user, isSuccess } =
        userAPI.useFetchLoginUserQuery(currentUserId);

    const avatarOptions: IAvatar = {
        picture: isSuccess ? user[0].color : "white",
        mode: "rectangle",
    };

    return (
        <main className={styles.main}>
            <Header
                userName={isSuccess ? user[0].userName : "name"}
                userAvatar={avatarOptions}
            ></Header>
            <Outlet />
        </main>
    );
};

export default Layout;
