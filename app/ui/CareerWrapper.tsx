import CareerCard from "./CareerCard";
import { careers } from "../interfaces/Game";
import { auth, signInAnonymously, db } from "@/lib/firebase/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { User, getAuth } from "firebase/auth";

async function addUserGames(user: User | null) {
  if (user) {
    const userRef = doc(collection(db, "users"), user?.uid);
    const docSnap = await getDoc(userRef);

    const userData = docSnap.data();
    if (userData && userData.gamesComplete.includes(1)) {
      console.log(" already exists in the games array.");
    } else {
      console.log("does not exist in the games array.");
    }
  }
}

export default function CareerWrapper() {
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <div
      id="game-cards"
      className="font-[family-name:var(--font-geist-sans)] flex justify-center content-center gap-4 flex-wrap"
    >
      {careers.map((career) => (
        <CareerCard key={career.careerId} careerId={career.careerId} />
      ))}
      <button
        onClick={() => addUserGames(user ? user : null)}
        className="btn bg-white btn-ghost text-[#0066A5] text-lg"
      >
        Add Game
      </button>
    </div>
  );
}
