import { useTypedDispatch } from "../hooks/redux";
import { authSlice } from "../store/reducers/authReducer";
import { usersSlice } from "../store/reducers/usersReducer";
import { LS, LocalStorage } from "../types/localStorage";

const Init = () => {
    const dispatch = useTypedDispatch();
    const { setCurrentId } = usersSlice.actions;
    const { userLogIn } = authSlice.actions;

    if (LS(LocalStorage.isAuth)) {
        dispatch(setCurrentId(+LS(LocalStorage.currentUserId)));
        dispatch(userLogIn(true));
    }

    console.log("init complete2");
};

export default Init;
