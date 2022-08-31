import React, { FC, memo } from "react";
import { Colors } from "../../../models/chess/Colors";
import {
    ECellAnderAttack,
    FigureNames,
} from "../../../store/types/chessReducerTypes";
import style from "../../chess/CellComponnent/style.module.css";
import { setSrc } from "../figures";
import { ICellProps } from "./types";

const Cell: FC<ICellProps> = ({ cell, click, selected }) => {
    return (
        <div>
            <div
                className={[
                    style.cell,
                    cell.color == Colors.WHITE ? style.white : style.black,
                    selected ? style.selected : null,
                    cell.available && cell.figure ? style.attack : null,
                    cell.isAvailableForWhite ? style.availableForW : null,
                    cell.isAvailableForBlack ? style.availableForB : null,
                    cell.figure?.name === FigureNames.KING
                        ? cell.figure.color === Colors.WHITE &&
                          cell[ECellAnderAttack.IS_BLACK]
                            ? style.kingAnderAttack
                            : cell.figure.color === Colors.BLACK &&
                              cell[ECellAnderAttack.IS_WHITE]
                                ? style.kingAnderAttack
                                : null
                        : null,
                    cell.isAggressor ? style.aggressor : null
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

export default memo(Cell);
