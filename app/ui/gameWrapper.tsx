import GameCard from "./gameCard";
import { careers } from "../interfaces/Game";

export default function GameWrapper() {
  return (
    <div
      id="game-cards"
      className="font-[family-name:var(--font-geist-sans)] flex justify-center content-center gap-4 flex-wrap"
    >
      {careers.map((career) => (
        <GameCard
          key={career.careerGuid.toString()}
          careerGuid={career.careerGuid}
        />
      ))}
    </div>
  );
}
