import { createSelector } from "@reduxjs/toolkit";
import { IInitialState } from "../types/chessReducerTypes";

export const sSelectedCell = (state: { chessBoard: IInitialState }) =>
    state.chessBoard.selectedCell;
export const sCurrentPlayer = (state: { chessBoard: IInitialState }) =>
    state.chessBoard.currentPlayer;
export const sBoard = (state: { chessBoard: IInitialState }) =>
    state.chessBoard.board;
export const sIsBoardEnable = (state: { chessBoard: IInitialState }) =>
    state.chessBoard.isBoardEnable;
export const sWinner = (state: { chessBoard: IInitialState }) =>
    state.chessBoard.winner;
export const sLostWhiteFigures = (state: { chessBoard: IInitialState }) =>
    state.chessBoard.board.lostWhiteFigures;
export const sLostBlackFigures = (state: { chessBoard: IInitialState }) =>
    state.chessBoard.board.lostBlackFigures;

export const selectB = createSelector(
    sLostBlackFigures,
    (lostBlackFigures) => lostBlackFigures,
);

export const selectW = createSelector(
    sLostWhiteFigures,
    (lostWhiteFigures) => lostWhiteFigures,
);

export const selectEnabled = createSelector(
    sIsBoardEnable,
    (isBoardEnable) => isBoardEnable,
);

export const selectWinner = createSelector(sWinner, (winner) => winner);

export const selectPlayer = createSelector(
    sCurrentPlayer,
    (currentPlayer) => currentPlayer,
);

export const allLostFigures = createSelector(
    [sLostBlackFigures, sLostWhiteFigures],
    (lostBlackFigures, lostWhiteFigures) => ({
        lostBlackFigures,
        lostWhiteFigures,
    }),
);

