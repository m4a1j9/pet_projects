import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState } from "../types/buttonReducerTypes";

const initialState: IInitialState = {
    isDisSignUp: true,
};

export const buttonSlice = createSlice({
    name: "button",
    initialState,
    reducers: {
        isSignUpButton(state, action: PayloadAction<boolean>) {
            state.isDisSignUp = action.payload;
        },
    },
});

export default buttonSlice.reducer;
