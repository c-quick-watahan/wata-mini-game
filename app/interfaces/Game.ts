import { title } from "process";
import { Sortable } from "./types";
import { Guid } from "guid-typescript";

export class Example {
  public id: Guid;
  constructor() {
    this.id = Guid.create(); // ==> b77d409a-10cd-4a47-8e94-b0cd0ab50aa1
  }
}

export type Id = string | number;
export interface Game {
  gameId: Id;
  name: string;
  filename: string;
  answerArray?: Id[];
  sortableItems?: Sortable[];
}
// export const games: Game[] = [];

export interface Career {
  careerGuid: Guid;
  careerName?: string;
  games: Game[];
}

export const careers: Career[] = [
  {
    careerGuid: Guid.create(),
    careerName: "Sashimi Chef",
    games: [
      {
        gameId: "Sashimi Game",
        name: "Sashimi Game",
        filename: "sushi",
        answerArray: [0, 1, 2, 3],
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
      },
      {
        gameId: "Sashimi Game",
        name: "Sashimi Game",
        filename: "sushi",
        answerArray: [0, 1, 2, 3],
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
      },
    ],
  },
  {
    careerGuid: Guid.create(),
    careerName: "Something else",
    games: [
      {
        gameId: "Sashimi Game",
        name: "Sashimi Game",
        filename: "sushi",
        answerArray: [0, 1, 2, 3],
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
      },
      {
        gameId: "Sashimi Game",
        name: "Sashimi Game",
        filename: "sushi",
        answerArray: [0, 1, 2, 3],
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
      },
    ],
  },
];

export const sampleGame: Game = {
  gameId: "Sashimi Game",
  name: "Sashimi Game",
  filename: "sushi",
  answerArray: [0, 1, 2, 3],
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
