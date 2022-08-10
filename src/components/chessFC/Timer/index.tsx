import React, { FC, useEffect, useRef, useState } from "react";
import { createCellsWithFigures } from "../createNewBoard";
import { ITimer } from "./types";
import { Colors } from "../../../models/chess/Colors";
import { useTypedDispatch } from "../../../hooks/redux";
import { chessSlice } from "../../../store/reducers/chessReducer";

const Timer: FC<ITimer> = ({ currentPlayer }) => {
    const dispatch = useTypedDispatch();
    const { setBoard } = chessSlice.actions;
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer]);

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        const callback =
            currentPlayer === Colors.WHITE
                ? decrementWhiteTimer
                : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    }

    function decrementBlackTimer() {
        setBlackTime((prev) => prev - 1);
    }

    function decrementWhiteTimer() {
        setWhiteTime((prev) => prev - 1);
    }

    const handleRestart = () => {
        setBlackTime(300);
        setWhiteTime(300);
        dispatch(
            setBoard({
                cells: createCellsWithFigures(),
                lostBlackFigures: [],
                lostWhiteFigures: [],
            }),
        );
    };

    return (
        <div>
            <div>
                <button onClick={handleRestart}> Restart game</button>
            </div>
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
        </div>
    );
};

export default Timer;
