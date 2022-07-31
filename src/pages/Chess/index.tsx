import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Board } from "../../models/chess/Board";
import BoardComponnent from "../../components/chess/BoardComponnent";
import { Player } from "../../models/chess/Player";
import { Colors } from "../../models/chess/Colors";
import LostFigures from "../../components/chess/LostFigures";
import Timer from "../../components/chess/Timer";

const Chess = () => {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer);
    }, []);

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    function swapPlayer() {
        setCurrentPlayer(
            currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer,
        );
    }

    // todo избавиться от рекурсии
    // todo условия для шаха и мата
    // todo проигрыш по истечению таймера
    // todo сделать кнопку для запуска иры вручную
    // todo история ходов
    // todo возвращать состояние по ходам
    // todo попробовать сделать по сети

    return (
        <div className={style.main}>
            <Timer currentPlayer={currentPlayer} restart={restart}></Timer>
            <BoardComponnent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
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

export default Chess;