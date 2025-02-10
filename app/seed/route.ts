import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Career } from "../interfaces/Game";
import { firebaseConfig } from "@/lib/firebase/config";

const app = initializeApp(firebaseConfig);
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
