import React, { useState } from "react";
import Board from "../../components/chessFC/Board";
import LostFigures from "../../components/chessFC/LostFigures";
import Timer from "../../components/chessFC/Timer";
import { useTypedSelector } from "../../hooks/redux";
import { Colors } from "../../models/chess/Colors";
import style from "../Chess/style.module.css";

const ChessFC = () => {
    const { currentPlayer, board, winner } = useTypedSelector(
        (state) => state.chessBoard,
    );
    const [modal, setModal] = useState(true);
    return (
        <div className={style.main}>
            <Timer currentPlayer={currentPlayer}></Timer>
            <div className={style.modalWrap}>
                {winner && modal && (
                    <p className={style.winner} onClick={() => setModal(false)}>
                        {winner} win!
                    </p>
                )}
                <div className={style.bordWrap}>
                    <p className={style.currentPlayerWrap}>
                        Current player -{" "}
                        <span className={style[currentPlayer]}>
                            {currentPlayer}
                        </span>
                    </p>
                    <Board />
                </div>
            </div>
            <div className={style.lostWrap}>
                <LostFigures
                    title="Black figures"
                    type={Colors.BLACK}
                />
                <LostFigures
                    title="White figures"
                    type={Colors.WHITE}
                />
            </div>
        </div>
    );
};

export default ChessFC;
