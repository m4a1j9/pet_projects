import { Colors } from "../../models/chess/Colors";

export interface IInitialState {
    board: IBoard;
    selectedCell: ICell | null;
    currentPlayer: Colors;
    winner: Colors | null;
}

export interface IBoard {
    cells: ICell[][];
    lostWhiteFigures: IFigure[];
    lostBlackFigures: IFigure[];
}

export interface ICell {
    x: number;
    y: number;
    color: Colors;
    figure: IFigure | null;
    id: number;
    available: boolean;
}

export interface IFigure {
    name: FigureNames;
    color: Colors;
    logo: string | null;
    isFirstStep: boolean;
}

export enum FigureNames {
    BISHOP = "BISHOP",
    KING = "KING",
    KNIGHT = "KNIGHT",
    PAWN = "PAWN",
    QUEEN = "QUEEN",
    ROOK = "ROOK",
}