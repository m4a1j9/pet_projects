import React from "react";
import style from "../Chess/style.module.css";
import { useTypedSelector } from "../../hooks/redux";
import Timer from "../../components/chessFC/Timer";
import LostFigures from "../../components/chessFC/LostFigures";
import Board from "../../components/chessFC/Board";

const ChessFC = () => {
    const { currentPlayer, board } = useTypedSelector((state) => state.chessBoard);
    return (
        <div className={style.main}>
            <Timer currentPlayer={currentPlayer}></Timer>
            <Board

            />
            <div>
                <LostFigures
                    title="Black figures"
                    figures={board.lostBlackFigures}
                />
            </div>
            <div>
                <LostFigures
                    title="White figures"
                    figures={board.lostWhiteFigures}
                />
            </div>
        </div>
    );
};

export default ChessFC;
