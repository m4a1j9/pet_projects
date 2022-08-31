import { Cell } from "../Cell";

export interface IBoard {
    cells: Cell[][];
}

export interface IBoardClass {
    initCells: () => void;
}
