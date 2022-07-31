import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IinputState } from "../types/inputReducerTypes";

const initialState: IinputState = {
    login: "",
    password: "",
    email: "",
    name: "",
};

export const inputSlice = createSlice({
    name: "input",
    initialState,
    reducers: {
        setLogin(state, action: PayloadAction<string>) {
            state.login = action.payload;
        },
        setPassworD(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
    },
});

export default inputSlice.reducer;
