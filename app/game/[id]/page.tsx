import { Game, sampleGames } from "@/app/interfaces/Game";
import React from "react";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = sampleGames.find((game) => game.id === id);
  const images = game?.gameImages;
  return (
    <div>
      {game?.name}
      {id}
      {images?.imgFiles?.map((image, index) => (
        <Image
          key={index}
          src={`/${images.filename}/${images.filename}_${index}.png`}
          width={227}
          height={80}
          alt="Watahan logo"
        />
      ))}
    </div>
  );
}
