import { Colors } from "../Colors";
import logo from "../../../assets/black-knight.png";
import { Cell } from "../Cell";

export enum FigureNames {
    "FIGURE" = "figure",
    "KING" = "king",
    "KNIGHT" = "knight",
    "PAWN" = "pawn",
    "QUEEN" = "queen",
    "ROOK" = "rook",
    "BISHOP" = "bishop",
}

export interface IFigure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number | null;
}

