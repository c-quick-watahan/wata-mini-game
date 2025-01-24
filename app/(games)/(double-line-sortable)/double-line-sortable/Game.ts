export interface Game {
  id: string;
  name: string;
  image: string;
  initial_array: string[];
  final_array: string[];
  gameImages?: GameImages;
}
export interface ImageFile {
  title?: string[];
  imgFiles?: string[];
}
export interface GameImages {
  id: string;
  filename: string;
  title?: string[];
  imgFiles?: string[];
}
export const sampleGames: Game[] = [
  {
    id: "1",
    name: "Sushi Game",
    image: "puzzle.png",
    initial_array: ["piece1", "piece2", "piece3"],
    final_array: ["sushi_0.png", "sushi_1.png", "sushi_2.png", "sushi_3.png"],
    gameImages: {
      id: "string",
      filename: "sushi",
      title: ["ウロコを書く", "3枚におろす", "皮を引く", "スライス"],
      imgFiles: ["sushi_0.png", "sushi_1.png", "sushi_2.png", "sushi_3.png"],
    },
  },
  {
    id: "2",
    name: "Memory Game",
    image: "memory.png",
    initial_array: ["card1", "card2", "card3"],
    final_array: ["card1", "card2", "card3"],
  },
];
