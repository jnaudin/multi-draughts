import { writable } from "svelte/store";

export interface ToastType {
  message: string;
  type?: "info" | "error";
  transitionDelay?: number;
}

const createToast = () => {
  const store = writable({} as ToastType);

  return {
    ...store,
    add: ({ type = "info", message, transitionDelay = 0 }: ToastType): void => {
      store.set({
        type,
        message,
        transitionDelay,
      } as ToastType);
    },
    remove: (): void => {
      store.set({} as ToastType);
    },
  };
};

export const toast = createToast();
