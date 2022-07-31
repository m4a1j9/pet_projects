import {Player} from "../../../models/chess/Player";

export interface ITimer {
    currentPlayer: Player | null;
    restart: () => void;
}
