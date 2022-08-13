import { Colors } from "../../models/chess/Colors";

export interface IInitialState {
    board: IBoard;
    selectedCell: ICell | null;
    currentPlayer: Colors;
    winner: Colors | null;
    winnerModal: boolean;
    isBoardEnable: boolean;
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
    logo: FigureLogos | null;
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

export enum FigureLogos {
    PAWN_W = "PAWN_W",
    KING_W = "KING_W",
    QUEEN_W = "QUEEN_W",
    BISHOP_W = "BISHOP_W",
    ROOK_W = "ROOK_W",
    KNIGHT_W = "KNIGHT_W",
    PAWN_B = "PAWN_B",
    KING_B = "KING_B",
    QUEEN_B = "QUEEN_B",
    BISHOP_B = "BISHOP_B",
    ROOK_B = "ROOK_B",
    KNIGHT_B = "KNIGHT_B",
}
