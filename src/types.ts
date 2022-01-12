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

export type SideType = "guess" | "propose";

export type GameType = "draughts" | "py";
