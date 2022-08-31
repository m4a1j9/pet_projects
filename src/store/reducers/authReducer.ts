import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types/authReducerTypes";

const initialState: AuthState = {
    isAuth: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogIn(state, action: PayloadAction<true>) {
            state.isAuth = action.payload;
        },
        userLogOut(state, action: PayloadAction<false>) {
            state.isAuth = action.payload;
        },
    },
});

export default authSlice.reducer;
