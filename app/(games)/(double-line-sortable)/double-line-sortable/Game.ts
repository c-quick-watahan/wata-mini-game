export interface Game {
  id: string;
  name: string;
  image: string;
  initial_array: string[];
  final_array: string[];
  sortableItems?: Item[];
}

export interface Item {
  id: string;
  filename: string;
  title: string[];
  imgFiles: string[];
}

export const sampleGames: Game[] = [
  {
    id: "1",
    name: "Sashimi Game",
    image: "puzzle.png",
    initial_array: ["piece1", "piece2", "piece3"],
    final_array: ["sushi_0.png", "sushi_1.png", "sushi_2.png", "sushi_3.png"],
    sortableItems: [
      {
        id: "string",
        filename: "sushi",
        title: ["ウロコを書く", "3枚におろす", "皮を引く", "スライス"],
        imgFiles: ["sushi_0.png", "sushi_1.png", "sushi_2.png", "sushi_3.png"],
      },
    ],
  },
];
