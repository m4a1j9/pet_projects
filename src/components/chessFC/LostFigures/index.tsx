import React, { FC } from "react";
import style from "./style.module.css";
import { ILostFigures } from "./types";

const LostFigures: FC<ILostFigures> = ({ title, figures }) => {
    return (
        <div className={style.lost}>
            <h3>{title}</h3>
            {figures?.map((figure) => (
                <div key={Math.random()}>
                    {figure?.name}{" "}
                    {figure?.logo && (
                        <img
                            src={figure.logo}
                            alt={figure?.name ?? "Figure"}
                            className={style.figure_logo}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default LostFigures;
