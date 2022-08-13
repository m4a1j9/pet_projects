import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    IBoard,
    ICell,
    IFigure,
    IInitialState,
} from "../types/chessReducerTypes";
import { Colors } from "../../models/chess/Colors";

const initialState: IInitialState = {
    board: {
        cells: [[]],
        lostWhiteFigures: [],
        lostBlackFigures: [],
    },
    selectedCell: null,
    currentPlayer: Colors.WHITE,
    winner: null,
    winnerModal: true,
    isBoardEnable: false
};

export const chessSlice = createSlice({
    name: "chessBoard",
    initialState,
    reducers: {
        setBoard(state, action: PayloadAction<IBoard>) {
            state.board = action.payload;
        },
        extinguishCells(state) {
            state.board.cells.map((row) =>
                row.map((cell) => (cell.available = false)),
            );
        },
        setCells(state, action: PayloadAction<ICell[][]>) {
            state.board.cells = action.payload;
        },
        moveFigure(state, action: PayloadAction<ICell>) {
            state.selectedCell!.figure!.isFirstStep = false;
            state.board.cells[action.payload.y][action.payload.x].figure =
                state.selectedCell?.figure ?? null;
            state.selectedCell
                ? (state.board.cells[state.selectedCell?.y][
                    state.selectedCell?.x
                ].figure = null)
                : null;
        },
        selectCell(state, action: PayloadAction<ICell | null>) {
            state.selectedCell = action.payload;
        },
        swapPlayer(state, action: PayloadAction<Colors>) {
            state.currentPlayer = action.payload;
        },
        addLostWhiteFigure(state, action: PayloadAction<IFigure>) {
            state.board.lostWhiteFigures.unshift(action.payload);
        },
        addLostBlackFigures(state, action: PayloadAction<IFigure>) {
            state.board.lostBlackFigures.unshift(action.payload);
        },
        setWinner(state, action: PayloadAction<Colors | null>){
            state.winner = action.payload;
        },
        showWinnerModal(state, action: PayloadAction<boolean>) {
            state.winnerModal = action.payload;
        },
        enableBoard(state, action: PayloadAction<boolean>) {
            state.isBoardEnable = action.payload;
        }
    },
});

export default chessSlice.reducer;
