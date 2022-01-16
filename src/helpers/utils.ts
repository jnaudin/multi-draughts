import type { ColorType, SideType } from "../types";

export const getSize = (isSmall: boolean): number => (isSmall ? 8 : 10);

export const invertColor = (color: ColorType): ColorType =>
  color === "black" ? "white" : "black";

export const invertSide = (side: SideType): SideType =>
  side === "hint" ? "guess" : "hint";
