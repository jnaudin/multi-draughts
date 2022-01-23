import type { FoundType, SideType } from "src/types";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { invertSide } from "../helpers/utils";

const createTurn = () => {
  const { subscribe, set, update }: Writable<SideType> = writable("hint");
  const change = () => update((side) => invertSide(side));

  return {
    subscribe,
    set,
    update,
    change,
  };
};

export const turnStore = createTurn();

export const pyGameListStore: Writable<string[]> = writable([]);
export const pyNumberStore: Writable<number> = writable(0);
export const pyWordStore: Writable<string> = writable("");
export const pyHintsStore: Writable<string[]> = writable([]);
export const pyGuessesStore: Writable<string[]> = writable([]);
export const pyPlayersStore: Writable<string[]> = writable([]);
export const pyGuesserStore: Writable<string> = writable("");
export const pyHinterStore: Writable<string> = writable("");
export const foundStore: Writable<FoundType> = writable("KO");
