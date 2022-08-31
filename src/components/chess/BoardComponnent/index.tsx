import React, { FC, useEffect, useState } from "react";
import style from "./style.module.css";
import { IBoardProps } from "./types";
import CellComponnent from "../CellComponnent";
import { Cell } from "../../../models/chess/Cell";

const BoardComponnent: FC<IBoardProps> = ({
    board,
    setBoard,
    swapPlayer,
    currentPlayer,
}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (
            selectedCell &&
            selectedCell !== cell &&
            selectedCell.figure?.canMove(cell)
        ) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
            swapPlayer();
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    useEffect(() => {
        highlightCells();
    }, [selectedCell]);

    function highlightCells() {
        board.highLightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3>Current player: {currentPlayer?.color}</h3>
            <div className={style.board}>
                {board.cells.map((row, index) => (
                    <React.Fragment key={index}>
                        {row.map((cell) => (
                            <CellComponnent
                                click={click}
                                key={cell.id}
                                cell={cell}
                                selected={
                                    cell.x === selectedCell?.x &&
                                    cell.y === selectedCell?.y
                                }
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default BoardComponnent;
