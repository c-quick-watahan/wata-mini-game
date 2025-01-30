"use client";
import React from "react";
import { Id } from "../interfaces/types";
import Link from "next/link";

export default function GameCard({
  gameId,
  careerGuid,
}: {
  gameId: Id;
  careerGuid: Id;
}) {
  return (
    <div
      key={gameId}
      className="card bg-base-100 w-auto sm:w-96 shadow-xl flex items-center justify-center"
    >
      <div className="card-body pt-8 pl-8 pr-8 pb-0 text-center">
        <h2 className="card-title">{gameId}</h2>
        <div className="card-actions"></div>
      </div>
      <Link href={`/${careerGuid}/${gameId}`}>Play Now</Link>
    </div>
  );
}
