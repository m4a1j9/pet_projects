import React from "react";
import {batch} from "react-redux";
import { useNavigate } from "react-router-dom";

import Hint from "../../components/UI/Hint";
import LogInForm from "../../components/LogInForm";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { userAPI } from "../../services/UserService";
import { authSlice } from "../../store/reducers/authReducer";
import { hintsSlice } from "../../store/reducers/hintsReducer";
import { inputSlice } from "../../store/reducers/inputReducer";
import { usersSlice } from "../../store/reducers/usersReducer";
import { IUser } from "../../store/types/usersReducerTypes";
import { Links } from "../../router/links";
import { LS, LSMode, LocalStorage } from "../../types/localStorage";
import styles from "./styles.module.css";

const Login = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const { setCurrentColor, setCurrentId, setCurrentName } =
        usersSlice.actions;
    const { showEnterHint } = hintsSlice.actions;
    const { setLogin, setPassworD } = inputSlice.actions;
    const { userLogIn } = authSlice.actions;
    const userLogin = useTypedSelector((state) => state.input);
    const isAuth = useTypedSelector((state) => state.auth);
    const hints = useTypedSelector((state) => state.hints);

    const {
        data: users,
        isLoading,
        isError,
        isSuccess,
    } = userAPI.useFetchAllUsersQuery(0);

    function checkLogin() {
        isSuccess &&
            users.forEach((user: IUser) => {
                if (
                    userLogin.login === user.login &&
                    userLogin.password === user.password
                ) {
                    LS(LocalStorage.isAuth, true, LSMode.set);
                    LS(LocalStorage.currentUserId, user.id, LSMode.set);
                    batch(() => {
                        dispatch(userLogIn(true));
                        dispatch(setCurrentColor(user.login));
                        dispatch(setCurrentId(+user.id));
                        dispatch(setCurrentName(user.color));
                    });

                    navigate(Links.profile, { replace: true });
                }
            });

        if (isAuth.isAuth) {
            dispatch(showEnterHint(false));
        } else {
            dispatch(showEnterHint(true));
        }
    }

    function setUserLogin(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setLogin(event.target.value));
    }

    function setPassword(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setPassworD(event.target.value));
    }

    if (isLoading) {
        return <h1>...loading</h1>;
    }

    if (isError) {
        return <h1>{isError}</h1>;
    }

    return (
        <div>
            <div className={styles.loginForm}>
                <LogInForm
                    inputActionTypes={{
                        login: setUserLogin,
                        password: setPassword,
                    }}
                    buttonAction={checkLogin}
                ></LogInForm>
            </div>
            {hints.enterHint ? (
                <Hint>uncorrected login or password</Hint>
            ) : null}
        </div>
    );
};

export default Login;
