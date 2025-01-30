"use client";
import React from "react";
import { Id } from "../interfaces/types";
import Link from "next/link";
import { Game } from "../interfaces/Game";

export default function GameCard({
  gameId,
  careerId,
  game,
}: {
  gameId: Id;
  careerId: Id;
  game: Game;
}) {
  const gameName = game.name;
  return (
    <div
      key={gameId}
      className="card bg-base-100 w-auto sm:w-96 shadow-xl flex items-center justify-center"
    >
      <div className="card-body pt-8 pl-8 pr-8 pb-0 text-center">
        <h2 className="card-title">{gameName}</h2>
        <div className="card-actions"></div>
      </div>
      <Link href={`/${careerId}/${gameId}`}>Play Now</Link>
    </div>
  );
}
