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
import {Colors} from "../../models/chess/Colors";
import {FigureLogos, FigureNames, IFigure,} from "../../store/types/chessReducerTypes";

// возвращаем обычный объект, тк redux не поддерживает экземпляры функций и классов
function CreateFigure(name: FigureNames, color: Colors, logo: FigureLogos): IFigure {
    return {
        name: name,
        color: color,
        logo: logo,
        isFirstStep: true,
        kingDefender: false
    };
}

const PAWN_W = CreateFigure(FigureNames.PAWN, Colors.WHITE, FigureLogos.PAWN_W);
const KING_W = CreateFigure(FigureNames.KING, Colors.WHITE, FigureLogos.KING_W);
const QUEEN_W = CreateFigure(FigureNames.QUEEN, Colors.WHITE, FigureLogos.QUEEN_W);
const BISHOP_W = CreateFigure(FigureNames.BISHOP, Colors.WHITE, FigureLogos.BISHOP_W);
const ROOK_W = CreateFigure(FigureNames.ROOK, Colors.WHITE, FigureLogos.ROOK_W);
const KNIGHT_W = CreateFigure(FigureNames.KNIGHT, Colors.WHITE, FigureLogos.KNIGHT_W);

const PAWN_B = CreateFigure(FigureNames.PAWN, Colors.WHITE, FigureLogos.PAWN_B);
const KING_B = CreateFigure(FigureNames.KING, Colors.WHITE, FigureLogos.KING_B);
const QUEEN_B = CreateFigure(FigureNames.KNIGHT, Colors.WHITE, FigureLogos.KNIGHT_B);
const BISHOP_B = CreateFigure(FigureNames.QUEEN, Colors.WHITE, FigureLogos.QUEEN_B);
const ROOK_B = CreateFigure(FigureNames.BISHOP, Colors.WHITE, FigureLogos.BISHOP_B);
const KNIGHT_B = CreateFigure(FigureNames.ROOK, Colors.WHITE, FigureLogos.ROOK_B);


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