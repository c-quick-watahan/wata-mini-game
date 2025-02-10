import { Sortable } from "./types";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

const db = getFirestore();

export const careers: Career[] = [
  {
    careerId: "sashimi-chef",
    careerName: "Sashimi Chef",
    games: [
      {
        gameId: "sashimi-game",
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

async function addCareersToFirestore() {
  for (const career of careers) {
    const careerRef = doc(db, "careers", career.careerId.toString());
    await setDoc(careerRef, career);
  }
}

addCareersToFirestore().catch(console.error);
