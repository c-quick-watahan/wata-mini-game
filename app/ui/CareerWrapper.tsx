import CareerCard from "./CareerCard";
import { careers } from "../interfaces/Game";

export default function CareerWrapper() {
  return (
    <div
      id="game-cards"
      className="font-[family-name:var(--font-geist-sans)] flex justify-center content-center gap-4 flex-wrap"
    >
      {careers.map((career) => (
        <CareerCard key={career.careerId} careerId={career.careerId} />
      ))}
    </div>
  );
}
