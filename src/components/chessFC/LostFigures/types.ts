import { IFigure } from "../../../store/types/chessReducerTypes";

export interface ILostFigures {
    title: string;
    figures: IFigure[] | null;
}
