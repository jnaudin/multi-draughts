import type { Writable } from "svelte/store";
import { get, writable } from "svelte/store";
import { getSize, invertColor } from "../helpers/utils";
import type {
  CellType,
  ColorType,
  CoordType,
  GameType,
  PieceType,
  PossibilityType,
} from "../types";

const createCurrentPlayer = () => {
  const { subscribe, set, update }: Writable<ColorType> = writable("white");
  const change = () => update((player) => invertColor(player));

  return {
    subscribe,
    set,
    update,
    change,
  };
};

export const currentPlayerStore = createCurrentPlayer();
export const selectedPieceStore: Writable<CoordType | undefined> =
  writable(undefined);
export const possibilitiesStore: Writable<PossibilityType[]> = writable([]);
export const isAdditionalMoveStore: Writable<boolean> = writable(false);
export const colorStore: Writable<ColorType | undefined> = writable(undefined);
export const gameListStore: Writable<string[]> = writable([]);
export const gameStore: Writable<string> = writable("");
export const gameTypeStore: Writable<GameType> = writable("draughts");
export const messageStore: Writable<string> = writable("");
export const playerNameStore: Writable<string> = writable("");

const getInitialBoard: () => CellType[][] = () =>
  new Array(getSize(false)).fill(0).map((_val, lineIndex) =>
    new Array(getSize(false)).fill(undefined).map((_val, index) => {
      if ((index + lineIndex) % 2) return { background: "white" };
      if (lineIndex < 3)
        return {
          background: "black",
          piece: { color: "black", type: "pawn" },
        };
      if (lineIndex > 6)
        return {
          background: "black",
          piece: { color: "white", type: "pawn" },
        };
      return { background: "black" };
    })
  );

const createBoard = () => {
  const { subscribe, set, update } = writable(getInitialBoard());

  const reset = () => set(getInitialBoard());

  const movePiece = (x: number, y: number, newX: number, newY: number) => {
    const previousPiece = get(boardStore)[x][y].piece;
    updateBox(x, y, undefined);
    updateBox(newX, newY, previousPiece);
  };

  const removePiece = (x: number, y: number) => updateBox(x, y, undefined);

  const setPieceType = (
    x: number,
    y: number,
    type: PieceType["type"] = "lady"
  ) => {
    const previousPiece = get(boardStore)[x][y].piece!;
    updateBox(x, y, { ...previousPiece, type });
  };

  const updateBox = (
    lineToUpdate: number,
    colToUpdate: number,
    piece: PieceType | undefined
  ) =>
    update((board) =>
      board.map((line, lineIndex) =>
        lineIndex === lineToUpdate
          ? line.map((col, colIndex) =>
              colIndex === colToUpdate && col.background === "black"
                ? { ...col, piece }
                : col
            )
          : line
      )
    );

  return {
    subscribe,
    set,
    update,
    movePiece,
    removePiece,
    reset,
    setPieceType,
    updateBox,
  };
};

export const boardStore = createBoard();
