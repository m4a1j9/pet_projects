import { Colors } from "../Colors";
import logo from "../../../assets/black-knight.png";
import { FigureNames, IFigure } from "../types/figureTypes";
import { Cell } from "../Cell";

export class Figure implements IFigure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number | null;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target: Cell): boolean {
        if (target.figure?.color === this.color) {
            return false;
        }
        if (target.figure?.name === FigureNames.KING) {
            return false;
        }
        return true;
    }

    moveFigure(target: Cell) {
        return true;
    }
}
