import { Board } from "../../../models/chess/Board";
import { Player } from "../../../models/chess/Player";

export interface IBoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}
