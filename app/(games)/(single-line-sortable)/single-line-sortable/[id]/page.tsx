import { sampleGames } from "@/app/interfaces/Game";
import React from "react";
import GameContext from "@/app/old_components/GameContext";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = sampleGames.find((game) => game.id === id);
  return (
    <div className="flex flex-col items-center">
      <h1>{game?.name}</h1>
      {game && <GameContext game={game} />}
    </div>
  );
}
