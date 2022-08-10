import { FigureNames, IFigure } from "../../store/types/chessReducerTypes";
import { Colors } from "../../models/chess/Colors";
import blackPawn from "../../assets/black-pawn.png";
import blackBishop from "../../assets/black-bishop.png";
import blackKnight from "../../assets/black-knight.png";
import blackQueen from "../../assets/black-queen.png";
import blackKing from "../../assets/black-king.png";
import blackRook from "../../assets/black-rook.png";
import whiteBishop from "../../assets/white-bishop.png";
import whiteKing from "../../assets/white-king.png";
import whiteKnight from "../../assets/white-knight.png";
import whitePawn from "../../assets/white-pawn.png";
import whiteQueen from "../../assets/white-queen.png";
import whiteRook from "../../assets/white-rook.png";

const PAWN_W: IFigure = {
    name: FigureNames.PAWN,
    color: Colors.WHITE,
    logo: whitePawn,
    isFirstStep: true
};
const KING_W: IFigure = {
    name: FigureNames.KING,
    color: Colors.WHITE,
    logo: whiteKing,
    isFirstStep: true
};
const QUEEN_W: IFigure = {
    name: FigureNames.QUEEN,
    color: Colors.WHITE,
    logo: whiteQueen,
    isFirstStep: true
};
const BISHOP_W: IFigure = {
    name: FigureNames.BISHOP,
    color: Colors.WHITE,
    logo: whiteBishop,
    isFirstStep: true
};
const ROOK_W: IFigure = {
    name: FigureNames.ROOK,
    color: Colors.WHITE,
    logo: whiteRook,
    isFirstStep: true
};
const KNIGHT_W: IFigure = {
    name: FigureNames.KNIGHT,
    color: Colors.WHITE,
    logo: whiteKnight,
    isFirstStep: true
};

const PAWN_B: IFigure = {
    name: FigureNames.PAWN,
    color: Colors.BLACK,
    logo: blackPawn,
    isFirstStep: true
};
const KING_B: IFigure = {
    name: FigureNames.KING,
    color: Colors.BLACK,
    logo: blackKing,
    isFirstStep: true
};
const KNIGHT_B: IFigure = {
    name: FigureNames.KNIGHT,
    color: Colors.BLACK,
    logo: blackKnight,
    isFirstStep: true
};
const QUEEN_B: IFigure = {
    name: FigureNames.QUEEN,
    color: Colors.BLACK,
    logo: blackQueen,
    isFirstStep: true
};
const BISHOP_B: IFigure = {
    name: FigureNames.BISHOP,
    color: Colors.BLACK,
    logo: blackBishop,
    isFirstStep: true
};
const ROOK_B: IFigure = {
    name: FigureNames.ROOK,
    color: Colors.BLACK,
    logo: blackRook,
    isFirstStep: true
};

export const Figures = {
    PAWN_W,
    KING_W,
    QUEEN_W,
    BISHOP_W,
    ROOK_W,
    KNIGHT_W,
    PAWN_B,
    KING_B,
    QUEEN_B,
    BISHOP_B,
    ROOK_B,
    KNIGHT_B,
} as const;