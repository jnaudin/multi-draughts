export type CoordType = {
  line: number;
  col: number;
};

export type PossibilityType = {
  coord: CoordType;
  type: "take" | "move";
  takeCoord?: CoordType;
};

export type ColorType = "white" | "black";

export type PieceType = { color: ColorType; type: "pawn" | "lady" };

export type CellType = { background: ColorType; piece?: PieceType };

export type SideType = "guess" | "hint";

export type GameType = "draughts" | "py";

export type FoundType = "OK" | "KO" | "WAIT";

export type WsMessageType =
  | "piece"
  | "box"
  | "color"
  | "games"
  | "message"
  | "game"
  | "number"
  | "word"
  | "side"
  | "hints"
  | "guesses"
  | "type"
  | "changename"
  | "players"
  | "guesser"
  | "hinter"
  | "found"
  | "reset";
