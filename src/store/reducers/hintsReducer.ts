import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHintsState } from "../types/hintsReducerTypes";

const initialState: IHintsState = {
    loginHint: false,
    passwordHint: false,
    nameHint: false,
    emailHint: false,
    enterHint: false,
};

export const hintsSlice = createSlice({
    name: "hints",
    initialState,
    reducers: {
        showLoginHint(state, action: PayloadAction<boolean>) {
            state.loginHint = action.payload;
        },
        showPasswordHint(state, action: PayloadAction<boolean>) {
            state.passwordHint = action.payload;
        },
        showNameHint(state, action: PayloadAction<boolean>) {
            state.nameHint = action.payload;
        },
        showEmailHint(state, action: PayloadAction<boolean>) {
            state.emailHint = action.payload;
        },
        showEnterHint(state, action: PayloadAction<boolean>) {
            state.enterHint = action.payload;
        },
    },
});

export default hintsSlice.reducer;
