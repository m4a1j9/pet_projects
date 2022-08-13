import React, {FC} from "react";
import blackBishop from "../../../assets/black-bishop.png";
import blackKing from "../../../assets/black-king.png";
import blackKnight from "../../../assets/black-knight.png";
import blackPawn from "../../../assets/black-pawn.png";
import blackQueen from "../../../assets/black-queen.png";
import blackRook from "../../../assets/black-rook.png";
import whiteBishop from "../../../assets/white-bishop.png";
import whiteKing from "../../../assets/white-king.png";
import whiteKnight from "../../../assets/white-knight.png";
import whitePawn from "../../../assets/white-pawn.png";
import whiteQueen from "../../../assets/white-queen.png";
import whiteRook from "../../../assets/white-rook.png";
import {Colors} from "../../../models/chess/Colors";
import {FigureLogos} from "../../../store/types/chessReducerTypes";
import style from "../../chess/CellComponnent/style.module.css";
import {setSrc} from "../figures";
import {ICellProps} from "./types";

const Cell: FC<ICellProps> = ({cell, click, selected}) => {
    return (
        <div>
            <div
                className={[
                    style.cell,
                    cell.color == Colors.WHITE ? style.white : style.black,
                    selected ? style.selected : null,
                    cell.available && cell.figure ? style.attack : null,
                ].join(" ")}
                onClick={() => click(cell)}
            >
                {cell.available && !cell.figure && (
                    <div className={style.available}></div>
                )}
                {cell.figure?.logo && (
                    <img

                        src={setSrc(cell.figure.logo)}
                        alt={cell.figure?.name ?? "figure"}
                        className={style.figure}
                    />
                )}
            </div>
        </div>
    );
};

export default Cell;
