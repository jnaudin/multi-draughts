import { handleBoxClick, handlePieceClick } from "$lib/Box/eventHandlers";
import type { Writable } from "svelte/store";
import { get, writable, readable } from "svelte/store";
import { getSize, invertColor } from "../helpers/utils";
import type {
  CellType,
  ColorType,
  CoordType,
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

const createSocket = () => {
  const { subscribe }: Writable<WebSocket> = writable<WebSocket>(
    undefined,
    (set) => {
      const socket = new WebSocket("ws://localhost:8999/");
      set(socket);

      socket.addEventListener("message", function (event) {
        const [type, line, col]: [
          type: "piece" | "box",
          line: string,
          col: string
        ] = event.data.split("-");
        if (type === "piece") handlePieceClick(+line, +col);
        else handleBoxClick(+line, +col);
      });

      return () => {
        socket.close();
      };
    }
  );

  const sendMessage = (message: string) => {
    const socket = get(socketStore);
    if (socket.readyState <= 1) {
      socket.send(message);
    }
  };

  return {
    subscribe,
    sendMessage,
  };
};

export const socketStore = createSocket();
