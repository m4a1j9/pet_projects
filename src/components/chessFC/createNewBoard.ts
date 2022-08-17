import { ICell } from "../../store/types/chessReducerTypes";
import { Colors } from "../../models/chess/Colors";
import { Figures } from "./figures";

export function createCellsWithFigures() {
    const cells: ICell[][] = [];
    for (let i = 0; i < 8; i++) {
        const row: ICell[] = [];
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 !== 0) {
                row.push({
                    x: j,
                    y: i,
                    color: Colors.BLACK,
                    figure: null,
                    id: Math.random(),
                    available: false,
                    isAvailableForWhite: 0,
                    isAvailableForBlack: 0,
                    isAggressor: false
                });
            } else {
                row.push({
                    x: j,
                    y: i,
                    color: Colors.WHITE,
                    figure: null,
                    id: Math.random(),
                    available: false,
                    isAvailableForWhite: 0,
                    isAvailableForBlack: 0,
                    isAggressor: false
                });
            }
        }
        cells.push(row);
    }

    for (let i = 0; i < 8; i++) {
        cells[1][i].figure = Figures.PAWN_B;
        cells[6][i].figure = Figures.PAWN_W;
    }

    cells[0][4].figure = Figures.KING_B;
    cells[7][4].figure = Figures.KING_W;

    cells[0][3].figure = Figures.QUEEN_B;
    cells[7][3].figure = Figures.QUEEN_W;

    cells[0][2].figure = Figures.BISHOP_B;
    cells[0][5].figure = Figures.BISHOP_B;
    cells[7][2].figure = Figures.BISHOP_W;
    cells[7][5].figure = Figures.BISHOP_W;

    cells[0][1].figure = Figures.KNIGHT_B;
    cells[0][6].figure = Figures.KNIGHT_B;
    cells[7][1].figure = Figures.KNIGHT_W;
    cells[7][6].figure = Figures.KNIGHT_W;

    cells[0][0].figure = Figures.ROOK_B;
    cells[0][7].figure = Figures.ROOK_B;
    cells[7][0].figure = Figures.ROOK_W;
    cells[7][7].figure = Figures.ROOK_W;

    // for (let i = 0; i < 4; i++) {
    //     const row: ICell[] = cells[i];
    //     for (let j = 0; j < 8; j++) {
    //         row[j].isAvailableForBlack = 1; // cells ander black attack
    //         if (i === 2 && (j === 0 || j === 2 || j === 5 || j === 7)) {
    //             row[j].isAvailableForBlack = 2; // for knights
    //         }
    //         if (i === 1 && (j === 3 || j === 4)) {
    //             row[j].isAvailableForBlack = 4; // for knights & queen & king
    //         }
    //         if (i === 0 && (j === 0 || j === 7)) {
    //             row[j].isAvailableForBlack = 0; // for rooks, it's defenseless
    //         }
    //     }
    // }
    //
    // for (let i = 4; i < 8; i++) {
    //     const row: ICell[] = cells[i];
    //     for (let j = 0; j < 8; j++) {
    //         row[j].isAvailableForWhite = 1; // cells ander white attack
    //         if (i === 5 && (j === 0 || j === 2 || j === 5 || j === 7)) {
    //             row[j].isAvailableForWhite = 2; // for knights
    //         }
    //         if (i === 6 && (j === 3 || j === 4)) {
    //             row[j].isAvailableForWhite = 4; // for knights & queen & king
    //         }
    //         if (i === 7 && (j === 0 || j === 7)) {
    //             row[j].isAvailableForWhite = 0; // for rooks, it's defenseless
    //         }
    //     }
    // }

    return cells;
}


