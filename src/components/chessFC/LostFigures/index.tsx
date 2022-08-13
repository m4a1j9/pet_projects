import React, { FC, useMemo } from "react";
import { useTypedSelector } from "../../../hooks/redux";
import { Colors } from "../../../models/chess/Colors";
import { IBoard } from "../../../store/types/chessReducerTypes";
import { setSrc } from "../figures";
import style from "./style.module.css";
import { ILostFigures } from "./types";

const LostFigures: FC<ILostFigures> = ({ title, type }) => {
    const { lostWhiteFigures, lostBlackFigures } = useTypedSelector(
        (state) => state.chessBoard.board,
    );

    useMemo(() => console.log("memo"), [lostWhiteFigures, lostBlackFigures]);
    console.log("updated");
    return (
        <div className={style.lost}>
            <h3>{title}</h3>
            <div className={style.lostListWrap}>
                {type === Colors.WHITE
                    ? lostWhiteFigures.length > 0 &&
                      lostWhiteFigures.map((figure, i) => {
                          return i < 4 ? (
                              <div key={Math.random()}>
                                  {figure?.logo && (
                                      <img
                                          src={setSrc(figure.logo)}
                                          alt={figure?.name ?? "Figure"}
                                          className={style.figure_logo}
                                      />
                                  )}
                              </div>
                          ) : null;
                      })
                    : lostBlackFigures.length > 0 &&
                      lostBlackFigures.map((figure, i) => {
                          return i < 4 ? (
                              <div key={Math.random()}>
                                  {figure?.logo && (
                                      <img
                                          src={setSrc(figure.logo)}
                                          alt={figure?.name ?? "Figure"}
                                          className={style.figure_logo}
                                      />
                                  )}
                              </div>
                          ) : null;
                      })}
                {/*{board[figures] && figures.length > 4 && (*/}
                {/*    <div>+ {figures.length - 4}</div>*/}
                {/*)}*/}
            </div>
        </div>
    );
};

export default LostFigures;
