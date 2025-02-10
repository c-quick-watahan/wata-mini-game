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
  careerId: Id;
  careerName?: string;
  games?: Game[];
}
