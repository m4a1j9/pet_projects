import { ICell } from "../../store/types/chessReducerTypes";
import { Colors } from "../../models/chess/Colors";
import { Figures } from "./figures";

export function createCellsWithFigures() {
    const cells: ICell[][] = [];
    for (let y = 0; y < 8; y++) {
        const row: ICell[] = [];
        for (let x = 0; x < 8; x++) {
            if ((y + x) % 2 !== 0) {
                row.push({
                    x: x,
                    y: y,
                    color: Colors.BLACK,
                    figure: null,
                    id: Math.random(),
                    available: false,
                    isAvailableForWhite: 0,
                    isAvailableForBlack: 0,
                    isAggressor: false,
                    defenderMustStay: null,
                });
            } else {
                row.push({
                    x: x,
                    y: y,
                    color: Colors.WHITE,
                    figure: null,
                    id: Math.random(),
                    available: false,
                    isAvailableForWhite: 0,
                    isAvailableForBlack: 0,
                    isAggressor: false,
                    defenderMustStay: null,
                });
            }
        }
        cells.push(row);
    }

    for (let x = 0; x < 8; x++) {
        cells[1][x].figure = Figures.PAWN_B;
        cells[6][x].figure = Figures.PAWN_W;
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

    return cells;
}


