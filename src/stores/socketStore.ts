import { handleBoxClick, handlePieceClick } from "$lib/Box/eventHandlers";
import type { ColorType, GameType, SideType } from "src/types";
import type { Writable } from "svelte/store";
import { get, writable } from "svelte/store";
import {
  pyCurrentSideStore,
  pyGameListStore,
  pyGuesserStore,
  pyHinterStore,
  pyNumberStore,
  pyPlayersStore,
  pyWordStore,
} from "./pyStores";
import {
  colorStore,
  gameListStore,
  gameStore,
  gameTypeStore,
  messageStore,
  playerNameStore,
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
            | "hint"
            | "guess"
            | "type"
            | "changename"
            | "players"
            | "guesser"
            | "hinter",
          arg0: string,
          arg1: string,
          arg2: string
        ] = event.data.split("-");
        if (type === "changename") playerNameStore.set(arg0);
        if (type === "players") pyPlayersStore.set(arg0.split(","));
        if (type === "guesser") pyGuesserStore.set(arg0);
        if (type === "hinter") pyHinterStore.set(arg0);
        if (type === "color") colorStore.set(arg0 as ColorType);
        if (type === "piece") handlePieceClick(+arg1, +arg2);
        if (type === "box") handleBoxClick(+arg1, +arg2);
        if (type === "games")
          (arg0 === "py" ? pyGameListStore : gameListStore).set(
            arg1.split(",")
          );
        if (type === "message") messageStore.set(arg0);
        if (type === "game") {
          gameTypeStore.set(arg1 as GameType);
          gameStore.set(arg0);
        }
        //for pyramide only
        if (type === "number") pyNumberStore.set(+arg1);
        if (type === "word") pyWordStore.set(arg1);
        // if (type === "hint") hint(arg1);
        // if (type === "guess") guess(arg1);
        if (type === "side") pyCurrentSideStore.set(arg1 as SideType);
      });

      return () => {
        console.log("probleme, connexion fermée ??");
        socket.close();
      };
    }
  );

  const sendMessage = (action: string, ...rest: (string | number)[]) => {
    const socket = get(socketStore);
    if (socket.readyState <= 1) {
      // add game name to message
      const game = get(gameStore);
      const gameString = game && action !== "changename" ? `-${game}` : "";
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
