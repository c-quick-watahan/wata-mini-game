import React from "react";
import { Game } from "../interfaces/Game";

export default function gameCard({ game }: { game: Game }) {
  return (
    <div key={game.id} className="card bg-base-100 w-auto sm:w-96 shadow-xl">
      <div className="card-body pt-8 pl-8 pr-8 pb-0 items-center">
        <h2 className="card-title">{game.name}</h2>
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
}
