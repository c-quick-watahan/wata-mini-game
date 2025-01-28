import React from "react";
import { Game } from "../interfaces/Game";
import Link from "next/link";

export default function gameCard({ game, url }: { game: Game; url: string }) {
  return (
    <div
      key={game.id}
      className="card bg-base-100 w-auto sm:w-96 shadow-xl flex items-center justify-center"
    >
      <div className="card-body pt-8 pl-8 pr-8 pb-0 text-center">
        <h2 className="card-title">{game.name}</h2>
        <h3>{url}</h3>
        <div className="card-actions"></div>
      </div>
      <Link href={`/${url}/${game.id}`}>Play {game.name}</Link>
    </div>
  );
}
