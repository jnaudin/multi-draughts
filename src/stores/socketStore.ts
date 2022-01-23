import { handleBoxClick, handlePieceClick } from "$lib/Box/eventHandlers";
import { toast } from "$lib/Toast/toastStore";
import type { ColorType, FoundType, GameType } from "src/types";
import type { Writable } from "svelte/store";
import { get, writable } from "svelte/store";
import {
  foundStore,
  pyGameListStore,
  pyGuesserStore,
  pyGuessesStore,
  pyHinterStore,
  pyHintsStore,
  pyNumberStore,
  pyPlayersStore,
  pyWordStore,
} from "./pyStores";
import {
  colorStore,
  gameListStore,
  gameStore,
  gameTypeStore,
  playerNameStore,
} from "./stores";

const createSocket = () => {
  const { subscribe }: Writable<WebSocket> = writable<WebSocket>(
    undefined,
    (set) => {
      // const socket = new WebSocket("wss://draughts-backend.nahoj.dev/");
      const socket = new WebSocket(import.meta.env.VITE_WS as string);
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
            | "hints"
            | "guesses"
            | "type"
            | "changename"
            | "players"
            | "guesser"
            | "hinter"
            | "found",
          arg0: string,
          arg1: string,
          arg2: string
        ] = event.data.split("-");
        if (type === "changename") playerNameStore.set(arg0);
        if (type === "players") pyPlayersStore.set(arg0.split(","));
        if (type === "guesser") {
          toast.add({ message: `${arg0} va faire deviner le mot` });
          pyGuesserStore.set(arg0);
        }
        if (type === "hinter") {
          toast.add({ message: `${arg0} va essayer de deviner le mot` });
          pyHinterStore.set(arg0);
        }
        if (type === "color") colorStore.set(arg0 as ColorType);
        if (type === "piece") handlePieceClick(+arg1, +arg2);
        if (type === "box") handleBoxClick(+arg1, +arg2);
        if (type === "games")
          (arg0 === "py" ? pyGameListStore : gameListStore).set(
            arg1 ? arg1.split(",") : []
          );
        if (type === "message") toast.add({ message: arg0 });
        if (type === "game") {
          gameTypeStore.set(arg1 as GameType);
          gameStore.set(arg0);
          toast.add({ message: `Une partie de ${arg1} commence : ${arg0}` });
        }
        //for pyramide only
        if (type === "number") {
          pyNumberStore.set(+arg1);
          toast.add({
            message: `${get(pyHinterStore)} va tenter ${arg1} mots !`,
          });
        }
        if (type === "word") pyWordStore.set(arg0);
        if (type === "hints") {
          const hints = arg0.split(",");
          pyHintsStore.set(hints);
          toast.add({
            message: `Indice de ${get(pyHinterStore)} : ${hints.at(-1)}`,
          });
        }
        if (type === "guesses") {
          const guesses = arg0.split(",");
          pyGuessesStore.set(guesses);
          toast.add({
            message: `${get(pyGuesserStore)} propose : ${guesses.at(-1)}`,
          });
        }
        if (type === "found") {
          foundStore.set(arg1 as FoundType);
          toast.add({
            message: `${get(pyGuesserStore)} propose : ${guesses.at(-1)}`,
          });
        }
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
