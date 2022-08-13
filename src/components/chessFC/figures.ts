import blackBishop from "../../assets/black-bishop.png";
import blackKing from "../../assets/black-king.png";
import blackKnight from "../../assets/black-knight.png";
import blackPawn from "../../assets/black-pawn.png";
import blackQueen from "../../assets/black-queen.png";
import blackRook from "../../assets/black-rook.png";
import whiteBishop from "../../assets/white-bishop.png";
import whiteKing from "../../assets/white-king.png";
import whiteKnight from "../../assets/white-knight.png";
import whitePawn from "../../assets/white-pawn.png";
import whiteQueen from "../../assets/white-queen.png";
import whiteRook from "../../assets/white-rook.png";
import {
    FigureLogos,
    FigureNames,
    IFigure,
} from "../../store/types/chessReducerTypes";
import { Colors } from "../../models/chess/Colors";

const PAWN_W: IFigure = {
    name: FigureNames.PAWN,
    color: Colors.WHITE,
    logo: FigureLogos.PAWN_W,
    isFirstStep: true,
};
const KING_W: IFigure = {
    name: FigureNames.KING,
    color: Colors.WHITE,
    logo: FigureLogos.KING_W,
    isFirstStep: true,
};
const QUEEN_W: IFigure = {
    name: FigureNames.QUEEN,
    color: Colors.WHITE,
    logo: FigureLogos.QUEEN_W,
    isFirstStep: true,
};
const BISHOP_W: IFigure = {
    name: FigureNames.BISHOP,
    color: Colors.WHITE,
    logo: FigureLogos.BISHOP_W,
    isFirstStep: true,
};
const ROOK_W: IFigure = {
    name: FigureNames.ROOK,
    color: Colors.WHITE,
    logo: FigureLogos.ROOK_W,
    isFirstStep: true,
};
const KNIGHT_W: IFigure = {
    name: FigureNames.KNIGHT,
    color: Colors.WHITE,
    logo: FigureLogos.KNIGHT_W,
    isFirstStep: true,
};

const PAWN_B: IFigure = {
    name: FigureNames.PAWN,
    color: Colors.BLACK,
    logo: FigureLogos.PAWN_B,
    isFirstStep: true,
};
const KING_B: IFigure = {
    name: FigureNames.KING,
    color: Colors.BLACK,
    logo: FigureLogos.KING_B,
    isFirstStep: true,
};
const KNIGHT_B: IFigure = {
    name: FigureNames.KNIGHT,
    color: Colors.BLACK,
    logo: FigureLogos.KNIGHT_B,
    isFirstStep: true,
};
const QUEEN_B: IFigure = {
    name: FigureNames.QUEEN,
    color: Colors.BLACK,
    logo: FigureLogos.QUEEN_B,
    isFirstStep: true,
};
const BISHOP_B: IFigure = {
    name: FigureNames.BISHOP,
    color: Colors.BLACK,
    logo: FigureLogos.BISHOP_B,
    isFirstStep: true,
};
const ROOK_B: IFigure = {
    name: FigureNames.ROOK,
    color: Colors.BLACK,
    logo: FigureLogos.ROOK_B,
    isFirstStep: true,
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

export function setSrc(logo: FigureLogos): string {
    switch (logo) {
        case FigureLogos.PAWN_W:
            return whitePawn;
        case FigureLogos.PAWN_B:
            return blackPawn;
        case FigureLogos.BISHOP_W:
            return whiteBishop;
        case FigureLogos.BISHOP_B:
            return blackBishop;
        case FigureLogos.KING_B:
            return blackKing;
        case FigureLogos.KING_W:
            return whiteKing;
        case FigureLogos.KNIGHT_B:
            return blackKnight;
        case FigureLogos.KNIGHT_W:
            return whiteKnight;
        case FigureLogos.QUEEN_B:
            return blackQueen;
        case FigureLogos.QUEEN_W:
            return whiteQueen;
        case FigureLogos.ROOK_B:
            return blackRook;
        case FigureLogos.ROOK_W:
            return whiteRook;
    }
}