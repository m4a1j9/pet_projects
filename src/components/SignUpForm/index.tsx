import React, { FC } from "react";

import { useTypedSelector } from "../../hooks/redux";
import { IHintsState } from "../../store/types/hintsReducerTypes";
import { Links } from "../../router/links";
import Hint from "../UI/Hint";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";
import MyLink from "../UI/MyLink";
import { IForm } from "./types";

const SignUpForm: FC<IForm> = ({ inputActionTypes, children, buttonProps }) => {
    const { emailHint, loginHint, nameHint, passwordHint }: IHintsState =
        useTypedSelector((state) => state.hints);

    return (
        <div>
            <h1>Sign up</h1>
            <form>
                <MyInput
                    type="text"
                    actionType={inputActionTypes.name}
                    placeholder="name"
                />
                {nameHint ? (
                    <Hint>The lenght of the name must be greater than 5</Hint>
                ) : null}

                <MyInput
                    type="text"
                    actionType={inputActionTypes.login}
                    placeholder="login"
                />
                {loginHint ? (
                    <Hint>The lenght of the name must be greater than 5</Hint>
                ) : null}

                <MyInput
                    type="password"
                    actionType={inputActionTypes.password}
                    placeholder="password"
                />
                {passwordHint ? (
                    <Hint>
                        The lenght of the password must be greater than 5
                    </Hint>
                ) : null}

                <MyInput
                    type="email"
                    actionType={inputActionTypes.email}
                    placeholder="email"
                />
                {emailHint ? (
                    <Hint>The email must contain @ and domain</Hint>
                ) : null}

                <MyButton
                    action={buttonProps.buttonAction}
                    isDis={buttonProps.isDisButton}
                >
                    Sign up
                </MyButton>
                <MyLink link={Links.login}>Log in?</MyLink>
                {children}
            </form>
        </div>
    );
};

export default SignUpForm;
