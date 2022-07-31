import { Cell } from "../../../models/chess/Cell";
import { Figure } from "../../../models/chess/figures/Figure";

export interface ICellComponnent {
    cell: Cell;
    selected: boolean;

    click(cell: Cell): void;
}
