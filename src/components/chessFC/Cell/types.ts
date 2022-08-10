import {ICell} from "../../../store/types/chessReducerTypes";

export interface ICellProps {
    click: (cell: ICell) => void
    cell: ICell
    selected: boolean
}
