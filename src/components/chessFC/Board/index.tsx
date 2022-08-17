import React, { useEffect, useRef } from "react";
import { batch } from "react-redux";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";
import { Colors } from "../../../models/chess/Colors";
import { chessSlice } from "../../../store/reducers/chessReducer";
import {
    ECellAnderAttack,
    FigureNames,
    ICell,
} from "../../../store/types/chessReducerTypes";
import style from "../../chess/BoardComponnent/style.module.css";
import Cell from "../Cell";
import { createCellsWithFigures } from "../createNewBoard";

const Board = () => {
    const dispatch = useTypedDispatch();
    const {
        selectedCell,
        currentPlayer,
        board,
        isBoardEnable,
        kingMustEscape,
        aggressorMustBeKilled,
    } = useTypedSelector((state) => state.chessBoard);

    const {
        selectCell,
        swapPlayer,
        addLostWhiteFigure,
        addLostBlackFigures,
        moveFigure,
        setCells,
        extinguishCells,
        disableToMoveAllToAll,
        setWhiteRisk,
        setBlackRisk,
        setWinner,
        enableBoard,
        AKingMustEscape,
        AAggressorMustBeKilled,
    } = chessSlice.actions;

    const firstForSelectedCell = useRef(true);
    const firstForCurrentPlayer = useRef(true);
    const firstForBoard = useRef(0);

    let aggressorOnTheWay = 0;
    let aggressorAmount = 0;
    let aggressorsAnderAttack = 0;

    function click(cell: ICell) {
        if (!isBoardEnable) {
            return;
        }
        if (selectedCell && selectedCell !== cell && cell.available) {
            moveFigureF(cell);
            batch(() => {
                dispatch(extinguishCells());
                dispatch(selectCell(null));
                dispatch(disableToMoveAllToAll());
                dispatch(AKingMustEscape(false));
                dispatch(AAggressorMustBeKilled(false));
            });
            swapPlayerF();
        } else if (cell.figure?.color === currentPlayer) {
            if (kingMustEscape && !aggressorMustBeKilled) {
                if (cell.figure?.name === FigureNames.KING) {
                    dispatch(selectCell(cell));
                }
            } else {
                dispatch(selectCell(cell));
            }
        } else {
            batch(() => {
                dispatch(extinguishCells());
                dispatch(selectCell(null));
            });
        }
    }

    // console.log(winner);
    useEffect(() => {
        dispatch(setCells(createCellsWithFigures()));
    }, []);

    useEffect(() => {
        if (firstForSelectedCell.current) {
            firstForSelectedCell.current = false;
        } else {
            selectedCell && highLightCells();
        }
    }, [selectedCell]);

    useEffect(() => {
        if (firstForCurrentPlayer.current) {
            firstForCurrentPlayer.current = false;
        } else {
            setAvailableToMove();
        }
    }, [currentPlayer]);

    useEffect(() => {
        if (firstForBoard.current === 0) {
            firstForBoard.current = 1;
        } else if (firstForBoard.current === 1) {
            setAvailableToMove();
            firstForBoard.current = 2;
        }
    }, [board]);

    // console.log(aggressorMustBeKilled);

    function canMoveGeneral(target: ICell): boolean {
        if (
            selectedCell!.figure?.color === target.figure?.color ||
            target.figure?.name === FigureNames.KING
        ) {
            return false;
        }
        return true;
    }

    function canMoveCurrent(target: ICell): boolean {
        switch (selectedCell!.figure?.name) {
            case FigureNames.PAWN:
                return canMovePawn(target);
            case FigureNames.ROOK:
                return canMoveRook(target);
            case FigureNames.KNIGHT:
                return canMoveKnight(target);
            case FigureNames.BISHOP:
                return canMoveBishop(target);
            case FigureNames.QUEEN:
                return canMoveQueen(target);
            case FigureNames.KING:
                return canMoveKing(target);
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

    function highLightCells() {
        console.time();
        const bufferCells: ICell[][] = JSON.parse(JSON.stringify(board.cells));
        for (let i = 0; i < bufferCells.length; i++) {
            const row: ICell[] = bufferCells[i];
            for (let j = 0; j < row.length; j++) {
                const target: ICell = row[j];
                target.available = false;
                if (canMoveGeneral(target) && canMoveCurrent(target)) {
                    target.available = true;
                }
            }
        }
        dispatch(setCells(bufferCells));
        console.timeEnd();
    }

    function isEmptyVertical(target: ICell): boolean {
        if (selectedCell!.x !== target.x) {
            return false;
        }
        if (!aggressorMustBeKilled) {
            aggressorOnTheWay = 1;
        }

        const min = Math.min(selectedCell!.y, target.y);
        const max = Math.max(selectedCell!.y, target.y);
        for (let y = min + 1; y < max; y++) {
            board.cells[y+1][target.x].isAggressor ? aggressorOnTheWay++ : false;

            if (board.cells[y][target.x].figure !== null) {
                return false;
            }
            console.log(board.cells[y][target.x]);
        }

        if (!aggressorOnTheWay) {
            return false;
        }

        console.log(aggressorOnTheWay);
        aggressorOnTheWay = 0;
        return true;
    }

    function isEmptyHorizontal(target: ICell): boolean {
        if (selectedCell!.y !== target.y) {
            return false;
        }
        if (!aggressorMustBeKilled) {
            aggressorOnTheWay = 1;
        }

        const min = Math.min(selectedCell!.x, target.x);
        const max = Math.max(selectedCell!.x, target.x);
        for (let x = min + 1; x < max; x++) {
            board.cells[target.y][x].isAggressor ? aggressorOnTheWay++ : false;
            if (board.cells[target.y][x].figure !== null) {
                return false;
            }
        }
        // if (!aggressorOnTheWay) {
        //     return false;
        // }
        aggressorOnTheWay = 0;
        return true;
    }

    function isEmptyDiagonal(target: ICell): boolean {
        const absX = Math.abs(target.x - selectedCell!.x);
        const absY = Math.abs(target.y - selectedCell!.y);
        if (absY !== absX) {
            return false;
        }
        const dy = selectedCell!.y < target.y ? 1 : -1;
        const dx = selectedCell!.x < target.x ? 1 : -1;
        if (!aggressorMustBeKilled) {
            aggressorOnTheWay = 1;
        }

        for (let i = 1; i < absY; i++) {
            board.cells[selectedCell!.y + dy * i][selectedCell!.x + dx * i]
                .isAggressor
                ? aggressorOnTheWay++
                : false;
            if (
                board.cells[selectedCell!.y + dy * i][selectedCell!.x + dx * i]
                    .figure !== null
            ) {
                return false;
            }
        }
        // if (!aggressorOnTheWay) {
        //     return false;
        // }
        aggressorOnTheWay = 0;
        return true;
    }

    function canMoveBishop(target: ICell): boolean {
        if (isEmptyDiagonal(target)) {
            return true;
        }
        return false;
    }

    function canMoveKing(target: ICell): boolean {
        let isAvailable: ECellAnderAttack;
        if (selectedCell!.figure?.color === Colors.WHITE) {
            isAvailable = ECellAnderAttack.IS_BLACK;
        } else {
            isAvailable = ECellAnderAttack.IS_WHITE;
        }

        if (
            isEmptyVertical(target) &&
            (target.y === selectedCell!.y + 1 ||
                target.y === selectedCell!.y - 1) &&
            target[isAvailable] === 0
        ) {
            return true;
        }
        if (
            isEmptyHorizontal(target) &&
            (target.x === selectedCell!.x + 1 ||
                target.x === selectedCell!.x - 1) &&
            target[isAvailable] === 0
        ) {
            return true;
        }
        if (
            isEmptyDiagonal(target) &&
            (target.x === selectedCell!.x + 1 ||
                target.x === selectedCell!.x - 1) &&
            target[isAvailable] === 0
        ) {
            return true;
        }
        return false;
    }

    function canMoveKnight(target: ICell): boolean {
        const dx = Math.abs(selectedCell!.x - target.x);
        const dy = Math.abs(selectedCell!.y - target.y);

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
    }

    function canMovePawn(target: ICell): boolean {
        const direction = selectedCell!.figure?.color === Colors.BLACK ? 1 : -1;
        const firstStepDirection =
            selectedCell!.figure?.color === Colors.BLACK ? 2 : -2;

        if (
            (target.y === selectedCell!.y + direction ||
                (selectedCell!.figure?.isFirstStep &&
                    target.y === selectedCell!.y + firstStepDirection)) &&
            target.x === selectedCell!.x &&
            board.cells[target.y][target.x].figure === null
        ) {
            return true;
        }

        if (
            target.y === selectedCell!.y + direction &&
            (target.x === selectedCell!.x + 1 ||
                target.x === selectedCell!.x - 1) &&
            isEnemy(target)
        ) {
            return true;
        }

        return false;
    }

    function canMoveQueen(target: ICell): boolean {
        if (isEmptyVertical(target)) {
            return true;
        }
        if (isEmptyHorizontal(target)) {
            return true;
        }
        if (isEmptyDiagonal(target)) {
            return true;
        }
        return false;
    }

    function canMoveRook(target: ICell): boolean {
        if (isEmptyVertical(target)) {
            return true;
        }
        if (isEmptyHorizontal(target)) {
            return true;
        }
        return false;
    }

    //****************// attack_and_defence //****************//

    function setAvailableToMove() {
        console.time();
        const bufferCells: ICell[][] = JSON.parse(JSON.stringify(board.cells));
        for (let i = 0; i < bufferCells.length; i++) {
            const row: ICell[] = bufferCells[i];
            for (let j = 0; j < row.length; j++) {
                const target: ICell = row[j];
                if (!target.figure) {
                    continue;
                }

                switch (target.figure.name) {
                    case FigureNames.PAWN:
                        canAttackAdnDefPawn(target, bufferCells);
                        break;
                    case FigureNames.BISHOP:
                        canAttackAdnDefBishop(target, bufferCells);
                        break;
                    case FigureNames.QUEEN:
                        canAttackAdnDefQueen(target, bufferCells);
                        break;
                    case FigureNames.ROOK:
                        canAttackAdnDefRook(target, bufferCells);
                        break;
                    case FigureNames.KNIGHT:
                        canAttackAdnDefKnight(target, bufferCells);
                        break;
                }
            }
        }
        for (let i = 0; i < bufferCells.length; i++) {
            const row: ICell[] = bufferCells[i];
            for (let j = 0; j < row.length; j++) {
                const target: ICell = row[j];
                if (!target.figure) {
                    continue;
                }

                if (target.figure.name === FigureNames.KING)
                    canAttackAdnDefKing(target, bufferCells);
            }
        }
        dispatch(setCells(bufferCells));
        console.timeEnd();
    }

    function isAttackHorizontal(target: ICell, bufferCells: ICell[][]) {
        const isAvailable: ECellAnderAttack = colorOfAttack(
            target.figure?.color,
        );
        const enemyKingColor: Colors =
            target.figure?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;

        for (let i = target.x + 1; i < 8; i++) {
            if (
                !calcMainAction(
                    target.y,
                    i,
                    bufferCells,
                    enemyKingColor,
                    isAvailable,
                    target,
                )
            ) {
                break;
            }
        }
        for (let i = target.x - 1; i >= 0; i--) {
            if (
                !calcMainAction(
                    target.y,
                    i,
                    bufferCells,
                    enemyKingColor,
                    isAvailable,
                    target,
                )
            ) {
                break;
            }
        }
    }

    function isAttackVertical(target: ICell, bufferCells: ICell[][]) {
        const isAvailable: ECellAnderAttack = colorOfAttack(
            target.figure?.color,
        );
        const enemyKingColor: Colors =
            target.figure?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;

        for (let i = target.y + 1; i < 8; i++) {
            if (
                !calcMainAction(
                    i,
                    target.x,
                    bufferCells,
                    enemyKingColor,
                    isAvailable,
                    target,
                )
            ) {
                break;
            }
        }
        for (let i = target.y - 1; i >= 0; i--) {
            if (
                !calcMainAction(
                    i,
                    target.x,
                    bufferCells,
                    enemyKingColor,
                    isAvailable,
                    target,
                )
            ) {
                break;
            }
        }
    }

    function isAttackDiagonal(target: ICell, bufferCells: ICell[][]) {
        const isAvailable: ECellAnderAttack = colorOfAttack(
            target.figure?.color,
        );
        const enemyKingColor: Colors =
            target.figure?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;

        for (let y = target.y + 1, x = target.x + 1; y < 8 && x < 8; y++, x++) {
            if (
                !calcMainAction(
                    y,
                    x,
                    bufferCells,
                    enemyKingColor,
                    isAvailable,
                    target,
                )
            ) {
                break;
            }
        }
        for (
            let y = target.y + 1, x = target.x - 1;
            y < 8 && x >= 0;
            y++, x--
        ) {
            if (
                !calcMainAction(
                    y,
                    x,
                    bufferCells,
                    enemyKingColor,
                    isAvailable,
                    target,
                )
            ) {
                break;
            }
        }
        for (
            let y = target.y - 1, x = target.x + 1;
            y >= 0 && x < 8;
            y--, x++
        ) {
            if (
                !calcMainAction(
                    y,
                    x,
                    bufferCells,
                    enemyKingColor,
                    isAvailable,
                    target,
                )
            ) {
                break;
            }
        }
        for (
            let y = target.y - 1, x = target.x - 1;
            y >= 0 && x >= 0;
            y--, x--
        ) {
            if (
                !calcMainAction(
                    y,
                    x,
                    bufferCells,
                    enemyKingColor,
                    isAvailable,
                    target,
                )
            ) {
                break;
            }
        }
    }

    function canAttackAdnDefPawn(target: ICell, bufferCells: ICell[][]) {
        const direction = target.figure?.color === Colors.BLACK ? 1 : -1;
        const isAvailable: ECellAnderAttack = colorOfAttack(
            target.figure?.color,
        );

        if (target.x < 7 && target.x > 0) {
            bufferCells[target.y + direction][target.x + 1][isAvailable] += 1;
            bufferCells[target.y + direction][target.x - 1][isAvailable] += 1;
            calcKingsRisk(
                target.y + direction,
                target.x - 1,
                bufferCells,
                target,
            );
        } else if (target.x === 0) {
            bufferCells[target.y + direction][target.x + 1][isAvailable] += 1;
            calcKingsRisk(
                target.y + direction,
                target.x + 1,
                bufferCells,
                target,
            );
        } else if (target.x === 7) {
            bufferCells[target.y + direction][target.x - 1][isAvailable] += 1;
            calcKingsRisk(
                target.y + direction,
                target.x - 1,
                bufferCells,
                target,
            );
        }
    }

    function canAttackAdnDefRook(target: ICell, bufferCells: ICell[][]) {
        isAttackVertical(target, bufferCells);
        isAttackHorizontal(target, bufferCells);
    }

    function canAttackAdnDefKnight(target: ICell, bufferCells: ICell[][]) {
        const isAvailable: ECellAnderAttack = colorOfAttack(
            target.figure?.color,
        );

        // Если клетка существует и на ней король - обозначаем источник за агрессора
        isCellExist(target.y + 1, target.x + 2, bufferCells, isAvailable) &&
            calcKingsRisk(target.y + 1, target.x + 2, bufferCells, target);
        isCellExist(target.y + 1, target.x - 2, bufferCells, isAvailable) &&
            calcKingsRisk(target.y + 1, target.x - 2, bufferCells, target);
        isCellExist(target.y - 1, target.x + 2, bufferCells, isAvailable) &&
            calcKingsRisk(target.y - 1, target.x + 2, bufferCells, target);
        isCellExist(target.y - 1, target.x - 2, bufferCells, isAvailable) &&
            calcKingsRisk(target.y - 1, target.x - 2, bufferCells, target);
        isCellExist(target.y + 2, target.x + 1, bufferCells, isAvailable) &&
            calcKingsRisk(target.y + 2, target.x + 1, bufferCells, target);
        isCellExist(target.y + 2, target.x - 1, bufferCells, isAvailable) &&
            calcKingsRisk(target.y + 2, target.x - 1, bufferCells, target);
        isCellExist(target.y - 2, target.x + 1, bufferCells, isAvailable) &&
            calcKingsRisk(target.y - 2, target.x + 1, bufferCells, target);
        isCellExist(target.y - 2, target.x - 1, bufferCells, isAvailable) &&
            calcKingsRisk(target.y - 2, target.x - 1, bufferCells, target);
    }

    function canAttackAdnDefBishop(target: ICell, bufferCells: ICell[][]) {
        isAttackDiagonal(target, bufferCells);
    }

    function canAttackAdnDefQueen(target: ICell, bufferCells: ICell[][]) {
        isAttackVertical(target, bufferCells);
        isAttackHorizontal(target, bufferCells);
        isAttackDiagonal(target, bufferCells);
    }

    function canAttackAdnDefKing(target: ICell, bufferCells: ICell[][]) {
        const isAvailable: ECellAnderAttack = colorOfAttack(
            target.figure?.color,
        );
        const anderAttack = colorOfEnemy(target.figure?.color);
        const enemyColor: Colors =
            target.figure?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;

        let availableCells = 0;

        function isCellAnderAttack(y: number, x: number) {
            return !bufferCells[y][x][anderAttack];
        }

        function isCellEmpty(y: number, x: number) {
            return !bufferCells[y][x].figure;
        }

        // Если клетка существует и на ней король - обозначаем источник за агрессора
        // функция так же используется на проверку доступности ходов для короля в случае шаха
        isCellExist(target.y + 1, target.x + 1, bufferCells, isAvailable) &&
            isCellEmpty(target.y + 1, target.x + 1) &&
            isCellAnderAttack(target.y + 1, target.x + 1) &&
            ++availableCells;
        isCellExist(target.y + 1, target.x - 1, bufferCells, isAvailable) &&
            isCellEmpty(target.y + 1, target.x - 1) &&
            isCellAnderAttack(target.y + 1, target.x - 1) &&
            ++availableCells;
        isCellExist(target.y + 1, target.x, bufferCells, isAvailable) &&
            isCellEmpty(target.y + 1, target.x) &&
            isCellAnderAttack(target.y + 1, target.x) &&
            ++availableCells;
        isCellExist(target.y - 1, target.x + 1, bufferCells, isAvailable) &&
            isCellEmpty(target.y - 1, target.x + 1) &&
            isCellAnderAttack(target.y - 1, target.x + 1) &&
            ++availableCells;
        isCellExist(target.y - 1, target.x - 1, bufferCells, isAvailable) &&
            isCellEmpty(target.y - 1, target.x - 1) &&
            isCellAnderAttack(target.y - 1, target.x - 1) &&
            ++availableCells;
        isCellExist(target.y - 1, target.x, bufferCells, isAvailable) &&
            isCellEmpty(target.y - 1, target.x) &&
            isCellAnderAttack(target.y - 1, target.x) &&
            ++availableCells;
        isCellExist(target.y, target.x + 1, bufferCells, isAvailable) &&
            isCellEmpty(target.y, target.x + 1) &&
            isCellAnderAttack(target.y, target.x + 1) &&
            ++availableCells;
        isCellExist(target.y, target.x - 1, bufferCells, isAvailable) &&
            isCellEmpty(target.y, target.x - 1) &&
            isCellAnderAttack(target.y, target.x - 1) &&
            ++availableCells;

        if (aggressorAmount === 1) {
            if (availableCells && aggressorsAnderAttack) {
                dispatch(AKingMustEscape(true));
                dispatch(AAggressorMustBeKilled(true));
            } else if (aggressorsAnderAttack) {
                dispatch(AAggressorMustBeKilled(true));
            } else {
                batch(() => {
                    dispatch(setWinner(enemyColor));
                    dispatch(enableBoard(false));
                    dispatch(extinguishCells());
                    dispatch(selectCell(null));
                });
            }
        } else if (aggressorAmount === 2) {
            if (availableCells) {
                dispatch(AKingMustEscape(true));
            } else {
                batch(() => {
                    dispatch(setWinner(enemyColor));
                    dispatch(enableBoard(false));
                    dispatch(extinguishCells());
                    dispatch(selectCell(null));
                });
            }
        }
    }

    function colorOfAttack(targetColor: Colors | undefined) {
        if (targetColor === Colors.WHITE) {
            return ECellAnderAttack.IS_WHITE;
        }
        return ECellAnderAttack.IS_BLACK;
    }

    function colorOfEnemy(targetColor: Colors | undefined) {
        if (targetColor === Colors.WHITE) {
            return ECellAnderAttack.IS_BLACK;
        }
        return ECellAnderAttack.IS_WHITE;
    }

    function calcKingsRisk(
        y: number,
        x: number,
        bufferCells: ICell[][],
        target: ICell,
    ): boolean {
        if (bufferCells[y][x].figure?.name === FigureNames.KING) {
            bufferCells[y][x].figure?.color === Colors.WHITE
                ? dispatch(setWhiteRisk(true))
                : dispatch(setBlackRisk(true));
            target.isAggressor = true;
            aggressorAmount++;
            isAggressorAnderAttack(target.y, target.x, bufferCells);
            return true;
        }
        return false;
    }

    function canMove(
        y: number,
        x: number,
        bufferCells: ICell[][],
        kingColor: Colors,
    ): boolean {
        return (
            bufferCells[y][x].figure === null ||
            (bufferCells[y][x].figure?.color === kingColor &&
                bufferCells[y][x].figure?.name === FigureNames.KING)
        );
    }

    function isCellExist(
        y: number,
        x: number,
        bufferCells: ICell[][],
        isAvailable: ECellAnderAttack,
    ): boolean {
        if (y > 0 && y < 8 && x > 0 && x < 8) {
            bufferCells[y][x][isAvailable] += 1;
            return true;
        }
        return false;
    }

    function isAggressorAnderAttack(
        y: number,
        x: number,
        bufferCells: ICell[][],
    ): boolean {
        const enemyColor = colorOfAttack(bufferCells[y][x].figure?.color);
        aggressorsAnderAttack++;
        return !!bufferCells[y][x][enemyColor];
    }

    function calcMainAction(
        y: number,
        x: number,
        bufferCells: ICell[][],
        enemyKingColor: Colors,
        isAvailable: ECellAnderAttack,
        target: ICell,
    ): boolean {
        if (canMove(y, x, bufferCells, enemyKingColor)) {
            bufferCells[y][x][isAvailable] += 1;
            calcKingsRisk(y, x, bufferCells, target);
        } else {
            bufferCells[y][x][isAvailable] += 1;
            return false;
        }
        return true;
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
