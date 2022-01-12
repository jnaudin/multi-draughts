import { handleBoxClick, handlePieceClick } from "$lib/Box/eventHandlers";
import type { ColorType, SideType } from "src/types";
import type { Writable } from "svelte/store";
import { get, writable } from "svelte/store";
import {
  pyCurrentSideStore,
  pyGameListStore,
  pyNumberStore,
  pyWordStore,
} from "./pyStores";
import {
  colorStore,
  gameListStore,
  gameStore,
  gameTypeStore,
  messageStore,
} from "./stores";

const createSocket = () => {
  const { subscribe }: Writable<WebSocket> = writable<WebSocket>(
    undefined,
    (set) => {
      // const socket = new WebSocket("wss://draughts-backend.nahoj.dev/");
      const socket = new WebSocket("ws://localhost:443");
      set(socket);

      socket.addEventListener("message", function (event) {
        const [type, arg0, arg1, arg2]: [
          type:
            | "piece"
            | "box"
            | "color"
            | "games"
            | "message"
            | "game"
            | "number"
            | "word"
            | "side"
            | "propose"
            | "guess"
            | "type",
          arg0: string,
          arg1: string,
          arg2: string
        ] = event.data.split("-");
        if (type === "color") colorStore.set(arg0 as ColorType);
        if (type === "piece") handlePieceClick(+arg1, +arg2);
        if (type === "box") handleBoxClick(+arg1, +arg2);
        if (type === "games")
          (arg0 === "py" ? pyGameListStore : gameListStore).set(
            arg1.split(",")
          );
        if (type === "message") messageStore.set(arg0);
        if (type === "game") {
          gameTypeStore.set(arg1);
          gameStore.set(arg0);
        }
        //for pyramide only
        if (type === "number") pyNumberStore.set(+arg1);
        if (type === "word") pyWordStore.set(arg1);
        // if (type === "propose") propose(arg1);
        // if (type === "guess") guess(arg1);
        if (type === "side") pyCurrentSideStore.set(arg1 as SideType);
      });

      return () => {
        socket.close();
      };
    }
  );

  const sendMessage = (action: string, ...rest: (string | number)[]) => {
    const socket = get(socketStore);
    if (socket.readyState <= 1) {
      // add game name to message
      const game = get(gameStore);
      const gameString = game ? `-${game}` : "";
      const args = rest.length ? `-${rest.map((a) => `${a}`).join("-")}` : "";
      const message = `${action}${gameString}${args}`;
      socket.send(message);
    }
  };

  return {
    subscribe,
    sendMessage,
  };
};

export const socketStore = createSocket();
