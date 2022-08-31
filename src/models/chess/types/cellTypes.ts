import { Colors } from "../Colors";
import { Figure } from "../figures/Figure";
import { Board } from "../Board";

export interface ICell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number;
}
