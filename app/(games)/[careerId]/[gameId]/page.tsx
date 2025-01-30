"use client";
import Board from "@/app/components/Board";
import { careers } from "@/app/interfaces/Game";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { careerId, gameId } = useParams();

  const career = careers.find((career) => career.careerId === careerId);
  const game = career?.games?.find((game) => game.gameId === gameId);
  return (
    <>
      <div id="page" className=" flex justify-center">
        {game && <Board game={game} />}
      </div>
    </>
  );
}
