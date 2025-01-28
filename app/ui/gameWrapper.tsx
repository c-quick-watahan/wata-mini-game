// import { prisma } from "../lib/prisma";
// import Card from "./card";
// import NewPostCard from "./new-post-card";

import { Game, sampleGames } from "../interfaces/Game";
import GameCard from "./gameCard";

export default function GameWrapper() {
  return (
    <div
      id="game-cards"
      className="font-[family-name:var(--font-geist-sans)] flex justify-center content-center gap-4 flex-wrap"
    >
      {sampleGames.map((game, index) => (
        <GameCard key={index} game={game} url={"single-line-sortable"} />
      ))}
    </div>
  );
}
