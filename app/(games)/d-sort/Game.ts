import { Sortable } from "./types";

export type Id = string | number;

export interface Game {
  gameId: Id;
  name: string;
  filename: string;
  sortableItems?: Sortable[];
}
export const sampleGame: Game = {
  gameId: 1,
  name: "Sashimi Game",
  filename: "sushi",
  sortableItems: [
    {
      id: 0,
      rowId: "bottom",
      title: "ウロコを書く",
      content: "sushi_0.png",
    },
    {
      id: 1,
      rowId: "bottom",
      title: "3枚におろす",
      content: "sushi_1.png",
    },
    {
      id: 2,
      rowId: "bottom",
      title: "皮を引く",
      content: "sushi_2.png",
    },
    {
      id: 3,
      rowId: "bottom",
      title: "スライス",
      content: "sushi_3.png",
    },
  ],
};
