import React, { FC } from "react";
import { Links } from "../../router/links";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";
import MyLink from "../UI/MyLink";
import styles from "./styles.module.css";
import { FormInt } from "./types";

const LogInForm: FC<FormInt> = ({
    inputActionTypes,
    buttonAction,
    children,
}) => {
    return (
        <div>
            <h1>Log in</h1>
            <form className={styles.form}>
                <MyInput
                    type="text"
                    actionType={inputActionTypes.login}
                    placeholder="login"
                />
                <MyInput
                    type="password"
                    actionType={inputActionTypes.password}
                    placeholder="password"
                />
                <MyButton action={buttonAction}>Log in</MyButton>
                <MyLink link={Links.signup}>Sign up?</MyLink>
                {children}
            </form>
        </div>
    );
};

export default LogInForm;
