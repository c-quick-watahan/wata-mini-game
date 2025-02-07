import CareerCard from "./CareerCard";
import { careers } from "../interfaces/Game";
import { auth, signInAnonymously, db } from "@/lib/firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const user = auth.currentUser;

export async function addUserGames() {
  if (user) {
    const userRef = doc(db, "users", user?.uid);
    await updateDoc(userRef, {
      gamesComplete: arrayUnion(-1),
    });
    // console.log(user.uid);
  }
}

export default function CareerWrapper() {
  return (
    <div
      id="game-cards"
      className="font-[family-name:var(--font-geist-sans)] flex justify-center content-center gap-4 flex-wrap"
    >
      {careers.map((career) => (
        <CareerCard key={career.careerId} careerId={career.careerId} />
      ))}
      <button
        onClick={() => {
          addUserGames();
        }}
        className="btn bg-white btn-ghost text-[#0066A5] text-lg"
      >
        Add Game
      </button>
    </div>
  );
}
