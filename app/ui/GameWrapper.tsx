import { Game, Id } from "../interfaces/Game";
import GameCard from "./GameCard";

export default function GameWrapper({
  careerId,
  games,
}: {
  careerId: Id;
  games: Game[];
}) {
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
