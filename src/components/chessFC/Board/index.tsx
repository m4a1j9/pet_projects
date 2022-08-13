import React, { useEffect } from "react";
import { Colors } from "../../../models/chess/Colors";
import {selectB} from "../../../store/selectors/chessSelectors";
import style from "../../chess/BoardComponnent/style.module.css";
import { FigureNames, ICell } from "../../../store/types/chessReducerTypes";
import Cell from "../Cell";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";
import { chessSlice } from "../../../store/reducers/chessReducer";
import { createCellsWithFigures } from "../createNewBoard";

const Board = () => {
    const dispatch = useTypedDispatch();
    const { selectedCell, currentPlayer, board, isBoardEnable } = useTypedSelector(
        (state) => state.chessBoard,
    );

    const {
        selectCell,
        swapPlayer,
        addLostWhiteFigure,
        addLostBlackFigures,
        moveFigure,
        setCells,
        extinguishCells,
    } = chessSlice.actions;

    useEffect(() => {
        dispatch(setCells(createCellsWithFigures()));
    }, []);

    function click(cell: ICell) {
        if (!isBoardEnable) {
            return;
        }
        if (selectedCell && selectedCell !== cell && cell.available) {
            moveFigureF(cell);
            dispatch(extinguishCells());
            dispatch(selectCell(null));
            swapPlayerF();
        } else if (cell.figure?.color === currentPlayer) {
            dispatch(selectCell(cell));
            highLightCells(cell);
        } else {
            dispatch(extinguishCells());
        }
    }

    function canMoveGeneral(
        target: ICell,
        ourCell: ICell = selectedCell!,
    ): boolean {
        if (
            ourCell?.figure?.color === target.figure?.color ||
            target.figure?.name === FigureNames.KING
        ) {
            return false;
        }
        return true;
    }

    function canMoveCurrent(
        target: ICell,
        ourCell: ICell = selectedCell!,
    ): boolean {
        switch (ourCell.figure?.name) {
            case FigureNames.PAWN:
                return canMovePawn(target, ourCell);
            case FigureNames.ROOK:
                return canMoveRook(target, ourCell);
            case FigureNames.KNIGHT:
                return canMoveKnight(target, ourCell);
            case FigureNames.BISHOP:
                return canMoveBishop(target, ourCell);
            case FigureNames.QUEEN:
                return canMoveQueen(target, ourCell);
            case FigureNames.KING:
                return canMoveKing(target, ourCell);
            default:
                return false;
        }
    }

    function swapPlayerF() {
        return currentPlayer === Colors.WHITE
            ? dispatch(swapPlayer(Colors.BLACK))
            : dispatch(swapPlayer(Colors.WHITE));
    }

    function moveFigureF(target: ICell) {
        if (target.figure) {
            target.figure.color === Colors.WHITE
                ? dispatch(addLostWhiteFigure(target.figure))
                : dispatch(addLostBlackFigures(target.figure));
        }
        dispatch(moveFigure(target));
    }

    function isEnemy(target: ICell): boolean {
        if (target.figure) {
            return selectedCell?.figure?.color !== target.figure.color;
        }
        return false;
    }

    function highLightCells(ourCell: ICell) {
        const bufferCells = JSON.parse(JSON.stringify(board.cells));
        for (let i = 0; i < board.cells.length; i++) {
            const row = board.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                bufferCells[i][j].available = false;
                if (
                    canMoveGeneral(target, ourCell) &&
                    canMoveCurrent(target, ourCell)
                ) {
                    bufferCells[i][j].available = true;
                }
            }
        }
        dispatch(setCells(bufferCells));
    }

    function isEmptyVertical(target: ICell, ourCell: ICell): boolean {
        if (ourCell.x !== target.x) {
            return false;
        }

        const min = Math.min(ourCell.y, target.y);
        const max = Math.max(ourCell.y, target.y);
        for (let y = min + 1; y < max; y++) {
            if (board.cells[y][target.x].figure !== null) {
                return false;
            }
        }
        return true;
    }

    function isEmptyHorizontal(target: ICell, ourCell: ICell): boolean {
        if (ourCell.y !== target.y) {
            return false;
        }

        const min = Math.min(ourCell.x, target.x);
        const max = Math.max(ourCell.x, target.x);
        for (let x = min + 1; x < max; x++) {
            if (board.cells[target.y][x].figure !== null) {
                return false;
            }
        }
        return true;
    }

    function isEmptyDiagonal(target: ICell, ourCell: ICell): boolean {
        const absX = Math.abs(target.x - ourCell.x);
        const absY = Math.abs(target.y - ourCell.y);
        if (absY !== absX) {
            return false;
        }
        const dy = ourCell.y < target.y ? 1 : -1;
        const dx = ourCell.x < target.x ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if (
                board.cells[ourCell.y + dy * i][ourCell.x + dx * i].figure !==
                null
            ) {
                return false;
            }
        }
        return true;
    }

    function canMoveBishop(target: ICell, ourCell: ICell): boolean {
        if (isEmptyDiagonal(target, ourCell)) {
            return true;
        }
        return false;
    }

    function canMoveKing(target: ICell, ourCell: ICell): boolean {
        if (
            isEmptyVertical(target, ourCell) &&
            (target.y === ourCell.y + 1 || target.y === ourCell.y - 1)
        ) {
            return true;
        }
        if (
            isEmptyHorizontal(target, ourCell) &&
            (target.x === ourCell.x + 1 || target.x === ourCell.x - 1)
        ) {
            return true;
        }
        if (
            isEmptyDiagonal(target, ourCell) &&
            (target.x === ourCell.x + 1 || target.x === ourCell.x - 1)
        ) {
            return true;
        }
        return false;
    }

    function canMoveKnight(target: ICell, ourCell: ICell): boolean {
        const dx = Math.abs(ourCell.x - target.x);
        const dy = Math.abs(ourCell.y - target.y);

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
    }

    function canMovePawn(target: ICell, ourCell: ICell): boolean {
        const direction = ourCell.figure?.color === Colors.BLACK ? 1 : -1;
        const firstStepDirection =
            ourCell.figure?.color === Colors.BLACK ? 2 : -2;

        if (
            (target.y === ourCell.y + direction ||
                (ourCell.figure?.isFirstStep &&
                    target.y === ourCell.y + firstStepDirection)) &&
            target.x === ourCell.x &&
            board.cells[target.y][target.x].figure === null
        ) {
            return true;
        }

        if (
            target.y === ourCell.y + direction &&
            (target.x === ourCell.x + 1 || target.x === ourCell.x - 1) &&
            isEnemy(target)
        ) {
            return true;
        }

        return false;
    }

    function canMoveQueen(target: ICell, ourCell: ICell): boolean {
        if (isEmptyVertical(target, ourCell)) {
            return true;
        }
        if (isEmptyHorizontal(target, ourCell)) {
            return true;
        }
        if (isEmptyDiagonal(target, ourCell)) {
            return true;
        }
        return false;
    }

    function canMoveRook(target: ICell, ourCell: ICell): boolean {
        if (isEmptyVertical(target, ourCell)) {
            return true;
        }
        if (isEmptyHorizontal(target, ourCell)) {
            return true;
        }
        return false;
    }

    return (
        <div>
            <div className={style.board}>
                {board.cells.map((row, index) => (
                    <React.Fragment key={index}>
                        {row.map((cell) => (
                            <Cell
                                click={click}
                                key={cell.id}
                                cell={cell}
                                selected={
                                    cell.y === selectedCell?.y &&
                                    cell.x === selectedCell?.x
                                }
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Board;
