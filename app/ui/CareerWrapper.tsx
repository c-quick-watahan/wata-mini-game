import CareerCard from "./CareerCard";
import { Career } from "../interfaces/Game";

interface CareerWrapperProps {
  careers: Career[];
}
export default function CareerWrapper(props: CareerWrapperProps) {
  const { careers } = props;

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
