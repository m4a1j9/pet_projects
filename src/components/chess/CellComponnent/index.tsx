import React, { FC } from "react";
import style from "./style.module.css";
import { ICellComponnent } from "./types";
import { Colors } from "../../../models/chess/Colors";

const CellComponnent: FC<ICellComponnent> = ({ cell, selected, click }) => {
    return (
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
                    alt={cell.figure.name}
                    className={style.figure}
                />
            )}
        </div>
    );
};

export default CellComponnent;
