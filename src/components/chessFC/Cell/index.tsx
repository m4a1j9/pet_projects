import React, { FC } from "react";
import { ICellProps } from "./types";
import style from "../../chess/CellComponnent/style.module.css";
import { Colors } from "../../../models/chess/Colors";

const Cell: FC<ICellProps> = ({ cell, click, selected }) => {
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
                        src={cell.figure.logo}
                        alt={cell.figure?.name ?? "figure"}
                        className={style.figure}
                    />
                )}
            </div>
        </div>
    );
};

export default Cell;
