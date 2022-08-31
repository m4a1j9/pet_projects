import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { authSlice } from "../../store/reducers/authReducer";
import { Links } from "../../router/links";
import { LS, LSMode, LocalStorage } from "../../types/localStorage";
import { IDropListValue } from "../UI/DropList/types";
import DropMenu from "../UI/DropMenu";
import MiniProfile from "../UI/MiniProfile";
import styles from "./styles.module.css";
import { IHeader } from "./types";

const Header: FC<IHeader> = ({ userName, userAvatar }) => {
    const navigate = useNavigate();
    const dispatch = useTypedDispatch();
    const { isAuth } = useTypedSelector((store) => store.auth);
    const { userLogOut } = authSlice.actions;

    const headerDropMenu: IDropListValue[] = [
        {
            title: "Profile",
            action() {
                navigate(Links.profile, { replace: true });
            },
        },
        {
            title: "Settings",
            action() {
                navigate(Links.settings, { replace: true });
            },
        },
        {
            title: "Log Out",
            action() {
                dispatch(userLogOut(false));
                LS(LocalStorage.isAuth, "", LSMode.remove);
                navigate(Links.login, { replace: true });
            },
        },
    ];

    return (
        <div className={styles.header}>
            <Link to={Links.mainPage} className={styles.title}>
                React app
            </Link>
            {isAuth ? (
                <div className={styles.profile_wrap}>
                    <MiniProfile
                        userName={userName}
                        avatar={userAvatar}
                    ></MiniProfile>
                    <DropMenu selectList={headerDropMenu}></DropMenu>
                </div>
            ) : (
                <Link to={Links.login}>Log in</Link>
            )}
        </div>
    );
};

export default Header;
