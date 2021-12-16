import type { ColorType } from "../types";

export const getSize = (isSmall: boolean): number => (isSmall ? 8 : 10);
export const invertColor = (color: ColorType): ColorType =>
  color === "black" ? "white" : "black";
