import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUsersState } from "../types/usersReducerTypes";

const initialState: IUsersState = {
    currentUserName: "user_name",
    currentUserId: 0,
    currentUserColor: "white",
};

export const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentName(state, action: PayloadAction<string>) {
            state.currentUserName = action.payload;
        },
        setCurrentId(state, action: PayloadAction<number>) {
            state.currentUserId = action.payload;
        },
        setCurrentColor(state, action: PayloadAction<string>) {
            state.currentUserColor = action.payload;
        },
    },
});

export default usersSlice.reducer;
