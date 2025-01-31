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
      className="
      card 
      bg-cyan-200 
      shadow-cyan-500/50 
      w-auto sm:w-96 shadow-xl 
      flex 
      items-center 
      justify-center 
      text-black 
      hover:bg-cyan-300
      transition-shadow 
      duration-300 
      ease-in-out"
    >
      <div className="card-body pt-8 pl-8 pr-8 pb-4 text-center">
        <h2 className="card-title">{gameName}</h2>
        <div className="card-actions"></div>
      </div>
      <div className="pb-2">
        <Link href={`/${careerId}/${gameId}`}>
          <button className="btn btn-primary p-">Play Now</button>
        </Link>
      </div>
    </div>
  );
}
