import { handleBoxClick, handlePieceClick } from "$lib/Box/eventHandlers";
import { toast } from "$lib/Toast/toastStore";
import type { ColorType, FoundType, GameType, WsMessageType } from "src/types";
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

const setToast = (type: WsMessageType, arg0: string, arg1: string) => {
  const messages: { [key in WsMessageType]?: string } = {
    guesser: `${arg0} va faire deviner le mot`,
    hinter: `${arg0} va essayer de deviner le mot`,
    message: arg0,
    game: `Une partie de ${arg1} commence : ${arg0}`,
    number: `${get(pyHinterStore)} va tenter ${arg1} mots !`,
    // hints: `Indice de ${get(pyHinterStore)} : ${arg0.split(",").at(-1)}`,
    hints: `Indice de ${get(pyHinterStore)} : ${
      arg0 ? arg0.split(",").at(-1) : ""
    }`,
    guesses: `${get(pyGuesserStore)} propose : ${
      arg0 ? arg0.split(",").at(-1) : ""
    }`,
    found:
      arg1 === "KO"
        ? "Raté !"
        : arg1 === "OK"
        ? `Bravo ${get(pyGuesserStore)}, c'est trouvé !`
        : "",
    reset: `Début d'une nouvelle partie`,
  };
  if (messages[type]) toast.add({ message: messages[type] || "" });
};

const createSocket = () => {
  const { subscribe }: Writable<WebSocket> = writable<WebSocket>(
    undefined,
    (set) => {
      // const socket = new WebSocket("wss://draughts-backend.nahoj.dev/");
      const socket = new WebSocket(import.meta.env.VITE_WS as string);
      set(socket);

      socket.addEventListener("message", function (event) {
        const [type, arg0, arg1, arg2]: [
          type: WsMessageType,
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
            arg1 ? arg1.split(",") : []
          );
        if (type === "game") {
          gameTypeStore.set(arg1 as GameType);
          gameStore.set(arg0);
        }
        if (type === "number") pyNumberStore.set(+arg1);

        if (type === "word") pyWordStore.set(arg0);
        if (type === "hints") {
          console.log(arg0, arg0.split(","));
          pyHintsStore.set(arg0.split(","));
        }
        if (type === "guesses") pyGuessesStore.set(arg0.split(","));
        if (type === "found") {
          console.log("FOUND", arg1);
          foundStore.set(arg1 as FoundType);
        }
        if (type === "reset") {
          console.log("RESET");
          pyNumberStore.set(0);
          pyWordStore.set("");
          pyHintsStore.set([]);
          pyGuessesStore.set([]);
          pyGuesserStore.set("");
          pyHinterStore.set("");
          foundStore.set("KO");
        }

        setToast(type, arg0, arg1);
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
