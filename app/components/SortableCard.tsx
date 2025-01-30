"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Sortable } from "../types";
import Image from "next/image";
import { Game } from "../Game";

interface Props {
  sortable: Sortable;
  game: Game;
}

export default function SortableCard({ sortable, game }: Props) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: sortable.id,
      data: {
        type: "Sortable",
        sortable,
      },
    });

  const style = {
    transition: transition || undefined,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div id="Row div" ref={setNodeRef} style={style}>
      <div
        className="min-h-full w-auto text-white text-center"
        {...attributes}
        {...listeners}
        suppressHydrationWarning={true}
        aria-describedby=""
      >
        {sortable.title}
        <Image
          src={`/${game.filename}/${sortable.content}`}
          width={227}
          height={80}
          alt={`${sortable.title}`}
        />
      </div>
    </div>
  );
}
