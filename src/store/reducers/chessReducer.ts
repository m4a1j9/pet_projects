import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState } from "../types/chessReducerTypes";

const initialState: IInitialState = {
    board: "",
};

export const chessSlice = createSlice({
    name: "chessBoard",
    initialState,
    reducers: {
        setBoard(state, action: PayloadAction<string>) {
            state.board = action.payload;
        },
    },
});

export default chessSlice.reducer;
