import validator from "email-validator";
import React from "react";
import { batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import SignUpForm from "../../components/SignUpForm";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { userAPI } from "../../services/UserService";
import { authSlice } from "../../store/reducers/authReducer";
import { buttonSlice } from "../../store/reducers/buttonReducer";
import { hintsSlice } from "../../store/reducers/hintsReducer";
import { inputSlice } from "../../store/reducers/inputReducer";
import { usersSlice } from "../../store/reducers/usersReducer";
import { IUser } from "../../store/types/usersReducerTypes";
import { Links } from "../../router/links";
import { LS, LSMode, LocalStorage } from "../../types/localStorage";

const SignUp = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const { showLoginHint, showEmailHint, showPasswordHint, showNameHint } =
        hintsSlice.actions;
    const { isSignUpButton } = buttonSlice.actions;
    const { setEmail, setLogin, setName, setPassworD } = inputSlice.actions;
    const { setCurrentId, setCurrentColor, setCurrentName } =
        usersSlice.actions;
    const { userLogIn } = authSlice.actions;
    const { login, password, email, name } = useTypedSelector(
        (state) => state.input,
    );
    const { isDisSignUp } = useTypedSelector((state) => state.button);
    const [createUser, { isError, isLoading }] =
        userAPI.useCreateUserMutation();

    async function putData() {
        if (isDisSignUp) {
            return;
        }
        await createUser({
            login,
            password,
            email,
            userName: name,
        } as IUser)
            .unwrap()
            .then((fulfilled) => {
                batch(() => {
                    dispatch(setCurrentId(+fulfilled.id));
                    dispatch(setCurrentColor(fulfilled.color));
                    dispatch(setCurrentName(fulfilled.userName));
                    dispatch(userLogIn(true));
                });
                LS(LocalStorage.isAuth, true, LSMode.set);
                navigate(Links.profile, { replace: true });
            })
            .catch((rejected) => console.error(rejected));
    }

    function setLoginF(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value.length > 5) {
            batch(() => {
                dispatch(setLogin(event.target.value));
                dispatch(showLoginHint(false));
                dispatch(isSignUpButton(false));
            });
        } else {
            batch(() => {
                dispatch(showLoginHint(true));
                dispatch(isSignUpButton(true));
            });
        }
    }

    function setEmailF(event: React.ChangeEvent<HTMLInputElement>) {
        if (validator.validate(event.target.value)) {
            batch(() => {
                dispatch(setEmail(event.target.value));
                dispatch(showEmailHint(false));
                dispatch(isSignUpButton(false));
            });
        } else {
            batch(() => {
                dispatch(showEmailHint(true));
                dispatch(isSignUpButton(true));
            });
        }
    }

    function setPasswordF(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value.length > 5) {
            batch(() => {
                dispatch(setPassworD(event.target.value));
                dispatch(showPasswordHint(false));
                dispatch(isSignUpButton(false));
            });
        } else {
            batch(() => {
                dispatch(showPasswordHint(true));
                dispatch(isSignUpButton(true));
            });
        }
    }

    function setNameF(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value.length > 5) {
            batch(() => {
                dispatch(setName(event.target.value));
                dispatch(showNameHint(false));
                dispatch(isSignUpButton(false));
            });
        } else {
            batch(() => {
                dispatch(showNameHint(true));
                dispatch(isSignUpButton(true));
            });
        }
    }

    return (
        <div>
            <SignUpForm
                inputActionTypes={{
                    login: setLoginF,
                    password: setPasswordF,
                    email: setEmailF,
                    name: setNameF,
                }}
                buttonProps={{
                    buttonAction: putData,
                    isDisButton: isDisSignUp,
                }}
            ></SignUpForm>
            {isLoading ? <h1>...loading</h1> : null}
            {isError ? <h1>{isError}</h1> : null}
        </div>
    );
};

export default SignUp;
