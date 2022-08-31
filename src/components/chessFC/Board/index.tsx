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
        setKingsRisk,
        setWinner,
        enableBoard,
        AKingMustEscape,
        AAggressorMustBeKilled,
    } = chessSlice.actions;

    const firstForSelectedCell = useRef(true);
    const firstForCurrentPlayer = useRef(true);
    const firstForBoard = useRef(0);
    const aggressorList: ICell[] = [];

    let aggressorsAnderAttack = 0;
    let kingBehindTheFigure = false;

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

    function canMoveGeneral(target: ICell, bufferCells: ICell[][]): boolean {
        if (
            selectedCell!.figure?.color === target.figure?.color ||
            target.figure?.name === FigureNames.KING
        ) {
            return false;
        }
        return true;
    }

    function canMoveCurrent(target: ICell, bufferCells: ICell[][]) {
        switch (selectedCell!.figure?.name) {
            case FigureNames.PAWN:
                return canMovePawn(target, bufferCells);
            case FigureNames.ROOK:
                return canMoveRook(target, bufferCells);
            case FigureNames.KNIGHT:
                return canMoveKnight(target, bufferCells);
            case FigureNames.BISHOP:
                return canMoveBishop(target, bufferCells);
            case FigureNames.QUEEN:
                return canMoveQueen(target, bufferCells);
            case FigureNames.KING:
                return canMoveKing(target, bufferCells);
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
        const bufferCells: ICell[][] = JSON.parse(JSON.stringify(board.cells));
        bufferCells.forEach((row) =>
            row.forEach((cell) => (cell.available = false)),
        );
        canMoveCurrent(selectedCell!, bufferCells);
        dispatch(setCells(bufferCells));
    }

    function isEmptyVertical(target: ICell, bufferCells: ICell[][]) {
        function calcMoveAction(y: number, x: number): boolean {
            if (bufferCells[y][x].figure === null) {
                bufferCells[y][x].available = true;
            } else if (bufferCells[y][x].figure?.color !== currentPlayer) {
                bufferCells[y][x].available = true;
                bufferCells[y][x].isAggressor ? ++aggressorIsFound : null;
                return false;
            } else {
                return false;
            }
            return true;
        }

        let aggressorIsFound = 0;

        for (let y = target.y + 1; y < 8; y++) {
            if (!calcMoveAction(y, target.x)) {
                break;
            }
        }
        if (aggressorMustBeKilled && aggressorIsFound === 0) {
            for (let y = target.y + 1; y < 8; y++) {
                resetAvailable(y, target.x, bufferCells);
            }
        }
        for (let y = target.y - 1; y >= 0; y--) {
            if (!calcMoveAction(y, target.x)) {
                break;
            }
        }
        if (aggressorMustBeKilled && aggressorIsFound === 0) {
            for (let y = target.y - 1; y >= 0; y--) {
                resetAvailable(y, target.x, bufferCells);
            }
        }
    }

    function isEmptyHorizontal(target: ICell, bufferCells: ICell[][]) {
        function calcMoveAction(y: number, x: number): boolean {
            if (bufferCells[y][x].figure === null) {
                bufferCells[y][x].available = true;
            } else if (bufferCells[y][x].figure?.color !== currentPlayer) {
                bufferCells[y][x].available = true;
                bufferCells[y][x].isAggressor ? ++aggressorIsFound : null;
                return false;
            } else {
                return false;
            }
            return true;
        }

        let aggressorIsFound = 0;

        for (let x = target.x + 1; x < 8; x++) {
            if (!calcMoveAction(target.y, x)) {
                break;
            }
        }
        if (aggressorMustBeKilled && aggressorIsFound === 0) {
            for (let x = target.x + 1; x < 8; x++) {
                resetAvailable(target.y, x, bufferCells);
            }
        }
        for (let x = target.x - 1; x >= 0; x--) {
            if (!calcMoveAction(target.y, x)) {
                break;
            }
        }
        if (aggressorMustBeKilled && aggressorIsFound === 0) {
            for (let x = target.x - 1; x >= 0; x--) {
                resetAvailable(target.y, x, bufferCells);
            }
        }
    }

    function isEmptyDiagonal(target: ICell, bufferCells: ICell[][]) {
        function calcMoveAction(y: number, x: number): boolean {
            if (bufferCells[y][x].figure === null) {
                bufferCells[y][x].available = true;
            } else if (bufferCells[y][x].figure?.color !== currentPlayer) {
                bufferCells[y][x].available = true;
                bufferCells[y][x].isAggressor ? ++aggressorIsFound : null;
                return false;
            } else {
                return false;
            }
            return true;
        }

        let aggressorIsFound = 0;

        for (let y = target.y + 1, x = target.x + 1; y < 8 && x < 8; y++, x++) {
            if (!calcMoveAction(y, x)) {
                break;
            }
        }
        if (aggressorMustBeKilled && aggressorIsFound === 0) {
            for (
                let y = target.y + 1, x = target.x + 1;
                y < 8 && x < 8;
                y++, x++
            ) {
                resetAvailable(y, x, bufferCells);
            }
        }
        for (
            let y = target.y + 1, x = target.x - 1;
            y < 8 && x >= 0;
            y++, x--
        ) {
            if (!calcMoveAction(y, x)) {
                break;
            }
        }
        if (aggressorMustBeKilled && aggressorIsFound === 0) {
            for (
                let y = target.y + 1, x = target.x - 1;
                y < 8 && x >= 0;
                y++, x--
            ) {
                resetAvailable(y, x, bufferCells);
            }
        }
        for (
            let y = target.y - 1, x = target.x + 1;
            y >= 0 && x < 8;
            y--, x++
        ) {
            if (!calcMoveAction(y, x)) {
                break;
            }
        }
        if (aggressorMustBeKilled && aggressorIsFound === 0) {
            for (
                let y = target.y - 1, x = target.x + 1;
                y >= 0 && x < 8;
                y--, x++
            ) {
                resetAvailable(y, x, bufferCells);
            }
        }
        for (
            let y = target.y - 1, x = target.x - 1;
            y >= 0 && x >= 0;
            y--, x--
        ) {
            if (!calcMoveAction(y, x)) {
                break;
            }
        }
        if (aggressorMustBeKilled && aggressorIsFound === 0) {
            for (
                let y = target.y - 1, x = target.x - 1;
                y >= 0 && x >= 0;
                y--, x--
            ) {
                resetAvailable(y, x, bufferCells);
            }
        }
    }

    function canMoveBishop(target: ICell, bufferCells: ICell[][]) {
        isEmptyDiagonal(target, bufferCells);
    }

    function canMoveKing(target: ICell, bufferCells: ICell[][]) {
        function calcKingMove(y: number, x: number) {
            aggressorIsFound = 0;
            if (
                isCellExistForMove(y, x) &&
                !bufferCells[y][x][anderAttack] &&
                bufferCells[y][x].figure?.color !== target.figure?.color
            ) {
                bufferCells[y][x].isAggressor ? ++aggressorIsFound : null;

                if (aggressorMustBeKilled) {
                    if (aggressorIsFound) {
                        bufferCells[y][x].available = true;
                    }
                } else {
                    bufferCells[y][x].available = true;
                }
            }
        }

        const anderAttack = colorOfEnemyExpansion(target.figure?.color);

        let aggressorIsFound = 0;

        calcKingMove(target.y + 1, target.x + 1);
        calcKingMove(target.y + 1, target.x - 1);
        calcKingMove(target.y + 1, target.x);
        calcKingMove(target.y - 1, target.x + 1);
        calcKingMove(target.y - 1, target.x - 1);
        calcKingMove(target.y - 1, target.x);
        calcKingMove(target.y, target.x + 1);
        calcKingMove(target.y, target.x - 1);
    }

    function canMoveKnight(target: ICell, bufferCells: ICell[][]) {
        function calcKnightMove(y: number, x: number) {
            aggressorIsFound = 0;
            if (
                isCellExistForMove(y, x) &&
                bufferCells[y][x].figure?.color !== target.figure?.color
            ) {
                bufferCells[y][x].isAggressor ? ++aggressorIsFound : null;

                if (aggressorMustBeKilled) {
                    if (aggressorIsFound) {
                        bufferCells[y][x].available = true;
                    }
                } else {
                    bufferCells[y][x].available = true;
                }
            }
        }

        let aggressorIsFound = 0;

        calcKnightMove(target.y + 1, target.x + 2);
        calcKnightMove(target.y + 1, target.x - 2);
        calcKnightMove(target.y - 1, target.x + 2);
        calcKnightMove(target.y - 1, target.x - 2);
        calcKnightMove(target.y + 2, target.x + 1);
        calcKnightMove(target.y + 2, target.x - 1);
        calcKnightMove(target.y - 2, target.x + 1);
        calcKnightMove(target.y - 2, target.x - 1);
    }

    function canMovePawn(target: ICell, bufferCells: ICell[][]) {
        function calcPawnAttack(y: number, x: number) {
            aggressorIsFound = 0;
            if (
                isCellExistForMove(y, x) &&
                bufferCells[y][x].figure &&
                bufferCells[y][x].figure?.color !== target.figure?.color
            ) {
                bufferCells[y][x].isAggressor ? ++aggressorIsFound : null;

                if (aggressorMustBeKilled) {
                    if (aggressorIsFound) {
                        bufferCells[y][x].available = true;
                    }
                } else {
                    bufferCells[y][x].available = true;
                }
            }
        }

        const direction = target.figure?.color === Colors.BLACK ? 1 : -1;

        let aggressorIsFound = 0;

        calcPawnAttack(target.y + direction, target.x + 1);
        calcPawnAttack(target.y + direction, target.x - 1);

        if (aggressorMustBeKilled) {
            // не можем двигаться, только атаковать
        } else {
            if (target.figure?.isFirstStep) {
                if (
                    bufferCells[target.y + direction][target.x].figure === null
                ) {
                    bufferCells[target.y + direction][target.x].available =
                        true;
                    if (
                        bufferCells[target.y + direction * 2][target.x]
                            .figure === null
                    ) {
                        bufferCells[target.y + direction * 2][
                            target.x
                        ].available = true;
                    }
                }
            } else {
                if (
                    bufferCells[target.y + direction][target.x].figure === null
                ) {
                    bufferCells[target.y + direction][target.x].available =
                        true;
                }
            }
        }
    }

    function canMoveQueen(target: ICell, bufferCells: ICell[][]) {
        isEmptyVertical(target, bufferCells);
        isEmptyHorizontal(target, bufferCells);
        isEmptyDiagonal(target, bufferCells);
    }

    function canMoveRook(target: ICell, bufferCells: ICell[][]) {
        isEmptyVertical(target, bufferCells);
        isEmptyHorizontal(target, bufferCells);
    }

    function isCellExistForMove(y: number, x: number): boolean {
        if (y >= 0 && y < 8 && x >= 0 && x < 8) {
            return true;
        }
        return false;
    }

    function resetAvailable(y: number, x: number, bufferCells: ICell[][]) {
        bufferCells[y][x].available = false;
    }

    //****************////****************// attack_and_defence //****************////****************//
    //****************////****************// attack_and_defence //****************////****************//
    //****************////****************// attack_and_defence //****************////****************//

    function setAvailableToMove() {
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
    }

    function isAttackHorizontal(target: ICell, bufferCells: ICell[][]) {
        const isAvailable: ECellAnderAttack = colorOfExpansion(
            target.figure?.color,
        );
        const enemyKingColor: Colors =
            target.figure?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;

        for (let y = target.x + 1; y < 8; y++) {
            if (
                !calcExpansion(
                    target.y,
                    y,
                    bufferCells,
                    enemyKingColor,
                    isAvailable,
                    target,
                )
            ) {
                break;
            }
        }

        for (let y = target.x - 1; y >= 0; y--) {
            if (
                !calcExpansion(
                    target.y,
                    y,
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

    function doubleCycle90Deg(
        target: ICell,
        bufferCells: ICell[][],
        condition: (i: number) => boolean,
        modification: (i: number) => number,
    ) {
        const isAvailable: ECellAnderAttack = colorOfExpansion(
            target.figure?.color,
        );
        const enemyKingColor: Colors =
            target.figure?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
        let canMove = true;
        let protectingFigures = 0;
        let defenderName: FigureNames | null = null;

        for (let y = target.y + 1; condition(y); y = modification(y)) {
            if (
                canMove &&
                !calcExpansion(
                    y,
                    target.x,
                    bufferCells,
                    enemyKingColor,
                    isAvailable,
                    target,
                )
            ) {
                canMove = false;
            }
            if (
                !canMove &&
                bufferCells[y][target.x].figure &&
                bufferCells[y][target.x].figure?.name !== FigureNames.KING
            ) {
                protectingFigures++;
                protectingFigures === 1
                    ? defenderName = bufferCells[y][target.x].figure!.name
                    : null;
            }
            if (
                !canMove &&
                bufferCells[y][target.x].figure?.name === FigureNames.KING &&
                protectingFigures === 1
            ) {
                kingBehindTheFigure = true;
            }
        }
        if (protectingFigures === 1 && kingBehindTheFigure) {
            for (let y = target.y + 1; condition(y); modification(y)) {
                bufferCells[y][target.x].defenderMustStay = defenderName;
            }
        }
    }

    function isAttackVertical(target: ICell, bufferCells: ICell[][]) {
        function noMore(i: number): boolean {
            return i < 8;
        }

        function increment(i: number): number {
            return ++i;
        }

        function noLess(i: number): boolean {
            return i > -1;
        }

        function decrement(i: number): number {
            return --i;
        }

        doubleCycle90Deg(target, bufferCells, noMore, increment);
        doubleCycle90Deg(target, bufferCells, noLess, decrement);
    }

    function isAttackDiagonal(target: ICell, bufferCells: ICell[][]) {
        const isAvailable: ECellAnderAttack = colorOfExpansion(
            target.figure?.color,
        );
        const enemyKingColor: Colors =
            target.figure?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;

        for (let y = target.y + 1, x = target.x + 1; y < 8 && x < 8; y++, x++) {
            if (
                !calcExpansion(
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
                !calcExpansion(
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
                !calcExpansion(
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
                !calcExpansion(
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
        const expansion: ECellAnderAttack = colorOfExpansion(
            target.figure?.color,
        );

        if (target.x < 7 && target.x > 0) {
            bufferCells[target.y + direction][target.x + 1][expansion] += 1;
            bufferCells[target.y + direction][target.x - 1][expansion] += 1;
            calcKingsRisk(
                target.y + direction,
                target.x - 1,
                bufferCells,
                target,
            );
        } else if (target.x === 0) {
            bufferCells[target.y + direction][target.x + 1][expansion] += 1;
            calcKingsRisk(
                target.y + direction,
                target.x + 1,
                bufferCells,
                target,
            );
        } else if (target.x === 7) {
            bufferCells[target.y + direction][target.x - 1][expansion] += 1;
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
        const isAvailable: ECellAnderAttack = colorOfExpansion(
            target.figure?.color,
        );

        function calcKnightsAttack(y: number, x: number) {
            isCellExistForAttack(y, x, bufferCells, isAvailable) &&
                calcKingsRisk(y, x, bufferCells, target);
        }

        calcKnightsAttack(target.y + 1, target.x + 2);
        calcKnightsAttack(target.y + 1, target.x - 2);
        calcKnightsAttack(target.y - 1, target.x + 2);
        calcKnightsAttack(target.y - 1, target.x - 2);
        calcKnightsAttack(target.y + 2, target.x + 1);
        calcKnightsAttack(target.y + 2, target.x - 1);
        calcKnightsAttack(target.y - 2, target.x + 1);
        calcKnightsAttack(target.y - 2, target.x - 1);
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
        const isAvailable: ECellAnderAttack = colorOfExpansion(
            target.figure?.color,
        );
        const anderAttack = colorOfEnemyExpansion(target.figure?.color);
        const outColor =
            target.figure?.color === Colors.WHITE ? Colors.WHITE : Colors.BLACK;

        let availableCells = 0;

        function isCellAnderAttack(y: number, x: number) {
            return !bufferCells[y][x][anderAttack];
        }

        function isCellEmpty(y: number, x: number) {
            return !bufferCells[y][x].figure;
        }

        // Если клетка существует и на ней король - обозначаем источник за агрессора
        // функция так же используется на проверку доступности ходов для короля в случае шаха
        function calcKingsMoveAndAttack(y: number, x: number) {
            isCellExistForAttack(y, x, bufferCells, isAvailable) &&
                isCellEmpty(y, x) &&
                isCellAnderAttack(y, x) &&
                ++availableCells;
        }

        calcKingsMoveAndAttack(target.y + 1, target.x + 1);
        calcKingsMoveAndAttack(target.y + 1, target.x - 1);
        calcKingsMoveAndAttack(target.y + 1, target.x);
        calcKingsMoveAndAttack(target.y - 1, target.x + 1);
        calcKingsMoveAndAttack(target.y - 1, target.x - 1);
        calcKingsMoveAndAttack(target.y - 1, target.x);
        calcKingsMoveAndAttack(target.y, target.x + 1);
        calcKingsMoveAndAttack(target.y, target.x - 1);

        if (aggressorList.length === 1) {
            const aggressor = aggressorList[0];
            isAggressorAnderAttack(aggressor.y, aggressor.x, bufferCells);

            if (availableCells && aggressorsAnderAttack) {
                dispatch(AKingMustEscape(true));
                dispatch(AAggressorMustBeKilled(true));
            } else if (availableCells) {
                dispatch(AKingMustEscape(true));
            } else if (aggressorsAnderAttack) {
                dispatch(AAggressorMustBeKilled(true));
            } else {
                batch(() => {
                    // на момент рассчета активный игрок будет уже другим
                    dispatch(setWinner(outColor));
                    dispatch(enableBoard(false));
                    dispatch(extinguishCells());
                    dispatch(selectCell(null));
                });
            }
        } else if (aggressorList.length === 2) {
            if (availableCells) {
                dispatch(AKingMustEscape(true));
            } else {
                batch(() => {
                    // на момент рассчета активный игрок будет уже другим
                    dispatch(setWinner(outColor));
                    dispatch(enableBoard(false));
                    dispatch(extinguishCells());
                    dispatch(selectCell(null));
                });
            }
        }
    }

    function colorOfExpansion(
        targetColor: Colors | undefined,
    ): ECellAnderAttack {
        if (targetColor === Colors.WHITE) {
            return ECellAnderAttack.IS_WHITE;
        }
        return ECellAnderAttack.IS_BLACK;
    }

    function colorOfEnemyExpansion(
        targetColor: Colors | undefined,
    ): ECellAnderAttack {
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
        if (
            bufferCells[y][x].figure?.name === FigureNames.KING &&
            bufferCells[y][x].figure?.color !== target.figure?.color
        ) {
            dispatch(setKingsRisk(true));
            target.isAggressor = true;
            aggressorList.push(target);
            return true;
        }
        return false;
    }

    function isCellExistForAttack(
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
    ) {
        const enemyExpansion = colorOfEnemyExpansion(
            bufferCells[y][x].figure?.color,
        );
        bufferCells[y][x][enemyExpansion] ? aggressorsAnderAttack++ : null;
    }

    function calcExpansion(
        y: number,
        x: number,
        bufferCells: ICell[][],
        enemyColor: Colors,
        isAvailable: ECellAnderAttack,
        target: ICell,
    ): boolean {
        console.log(y, x);
        if (
            bufferCells[y][x].figure === null ||
            (bufferCells[y][x].figure?.color === enemyColor &&
                bufferCells[y][x].figure?.name === FigureNames.KING)
        ) {
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
