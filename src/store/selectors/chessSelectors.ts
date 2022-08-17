import { createSelector } from "@reduxjs/toolkit";
import { Colors } from "../../models/chess/Colors";
import { IInitialState } from "../types/chessReducerTypes";

export const sCurrentPlayer = (state: { chessBoard: IInitialState }) =>
    state.chessBoard.currentPlayer;

export const sWinner = (state: { chessBoard: IInitialState }) =>
    state.chessBoard.winner;
export const sLostWhiteFigures = (state: { chessBoard: IInitialState }) =>
    state.chessBoard.board.lostWhiteFigures;
export const sLostBlackFigures = (state: { chessBoard: IInitialState }) =>
    state.chessBoard.board.lostBlackFigures;

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

