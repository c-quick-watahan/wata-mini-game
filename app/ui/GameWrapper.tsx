"use client";
import { useEffect, useState } from "react";
import { Game, Id } from "../interfaces/Game";
import GameCard from "./GameCard";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export default function GameWrapper({ careerId }: { careerId: Id }) {
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    async function getCareers() {
      const careerRef = doc(collection(db, "careers"), careerId.toString());
      const docSnap = await getDoc(careerRef);

      const careerData = docSnap.data();
      console.log("CAREER DATA", careerData);

      const gamesList: Game[] = [];
      if (!careerData) return;
      careerData.games.forEach((game: Game) => {
        const data = game as Game;
        gamesList.push(data);
      });
      setGames(gamesList);
    }

    getCareers();
  }, []);
  console.log("games", games);
  return (
    <div
      id="game-cards"
      className="font-[family-name:var(--font-geist-sans)] flex justify-center content-center gap-4 flex-wrap"
    >
      {games.map((game) => (
        <GameCard
          key={game.gameId}
          careerId={careerId}
          gameId={game.gameId}
          game={game}
        />
      ))}
    </div>
  );
}
