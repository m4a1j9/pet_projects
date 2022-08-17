import React, { FC, useEffect, useRef, useState } from "react";
import { batch } from "react-redux";
import { useTypedDispatch } from "../../../hooks/redux";
import { Colors } from "../../../models/chess/Colors";
import { chessSlice } from "../../../store/reducers/chessReducer";
import MyButton from "../../UI/MyButton";
import { createCellsWithFigures } from "../createNewBoard";
import { ITimer } from "./types";

const Timer: FC<ITimer> = ({ currentPlayer }) => {
    const dispatch = useTypedDispatch();
    const { showWinnerModal, setWinner, setBoard, enableBoard, extinguishCells, selectCell, swapPlayer } =
        chessSlice.actions;
    const [blackTime, setBlackTime] = useState(300); // 300
    const [whiteTime, setWhiteTime] = useState(300);
    const [firstGame, setFirstGame] = useState(true);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            startTimer();
        }
    }, [currentPlayer]);

    useEffect(() => {
        if (blackTime <= 0) {
            clearInterval(timer.current!);
            batch(() => {
                dispatch(setWinner(Colors.WHITE));
                dispatch(enableBoard(false));
                dispatch(extinguishCells());
                dispatch(selectCell(null));
            });
        }
        if (whiteTime <= 0) {
            clearInterval(timer.current!);
            batch(() => {
                dispatch(setWinner(Colors.BLACK));
                dispatch(enableBoard(false));
                dispatch(extinguishCells());
                dispatch(selectCell(null));
            });
        }
    }, [blackTime, whiteTime]);

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

    function setGame() {
        if (firstGame) {
            setFirstGame(false);
        } else {
            setBlackTime(300); // 300
            setWhiteTime(300);
            batch(() => {
                dispatch(
                    setBoard({
                        cells: createCellsWithFigures(),
                        lostBlackFigures: [],
                        lostWhiteFigures: [],
                    }),
                );
                dispatch(setWinner(null));
                dispatch(showWinnerModal(true));
                dispatch(swapPlayer(Colors.WHITE));
            });
        }
        dispatch(enableBoard(true));
        startTimer();
    }

    return (
        <div>
            <MyButton action={setGame}>
                {firstGame ? "Start" : "Restart"}
            </MyButton>
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
        </div>
    );
};

export default Timer;
