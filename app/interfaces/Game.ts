import { Sortable } from "./types";

export type Id = string | number;
export interface Game {
  gameId: Id;
  name: string;
  filename: string;
  answerArray?: Id[];
  sortableItems?: Sortable[];
}

export interface Career {
  careerGuid: Id;
  careerName?: string;
  games?: Game[];
}

export const careers: Career[] = [
  {
    careerGuid: "6f90f733-3b7b-6854-9965-db2e24ca143a",
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
        gameId: "Fish Peeling Game",
        name: "Pealing Game",
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
    careerGuid: "a0290b8a-c9a1-76cd-586e-fe41ec4394f8",
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
