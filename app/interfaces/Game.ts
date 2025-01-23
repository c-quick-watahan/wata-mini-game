export interface Game {
  id: string;
  name: string;
  image: string;
  initial_array: string[];
  final_array: string[];
}
export const sampleGames: Game[] = [
  {
    id: "1",
    name: "Puzzle Game",
    image: "puzzle.png",
    initial_array: ["piece1", "piece2", "piece3"],
    final_array: ["piece1", "piece2", "piece3"],
  },
  {
    id: "2",
    name: "Memory Game",
    image: "memory.png",
    initial_array: ["card1", "card2", "card3"],
    final_array: ["card1", "card2", "card3"],
  },
];
