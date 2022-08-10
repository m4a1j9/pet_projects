import {Cell} from "../../models/chess/Cell";
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
                });
            } else {
                row.push({
                    x: j,
                    y: i,
                    color: Colors.WHITE,
                    figure: null,
                    id: Math.random(),
                    available: false,
                });
            }
        }
        cells.push(row);
    }

    function addPawns() {
        for (let i = 0; i < 8; i++) {
            cells[1][i].figure = Figures.PAWN_B;
            cells[6][i].figure = Figures.PAWN_W;
        }
    }

    function addKings() {
        cells[0][4].figure = Figures.KING_B;
        cells[7][4].figure = Figures.KING_W;
    }

    function addQueens() {
        cells[0][3].figure = Figures.QUEEN_B;
        cells[7][3].figure = Figures.QUEEN_W;
    }

    function addBishops() {
        cells[0][2].figure = Figures.BISHOP_B;
        cells[0][5].figure = Figures.BISHOP_B;
        cells[7][2].figure = Figures.BISHOP_W;
        cells[7][5].figure = Figures.BISHOP_W;
    }

    function addKnights() {
        cells[0][1].figure = Figures.KNIGHT_B;
        cells[0][6].figure = Figures.KNIGHT_B;
        cells[7][1].figure = Figures.KNIGHT_W;
        cells[7][6].figure = Figures.KNIGHT_W;
    }

    function addRooks() {
        cells[0][0].figure = Figures.ROOK_B;
        cells[0][7].figure = Figures.ROOK_B;
        cells[7][0].figure = Figures.ROOK_W;
        cells[7][7].figure = Figures.ROOK_W;
    }

    addPawns();
    addKings();
    addQueens();
    addBishops();
    addKnights();
    addRooks();

    return cells;
}


