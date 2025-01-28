import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Sortable } from "../types";
import Image from "next/image";
import { Game } from "../Game";
import gameCard from "@/app/ui/gameCard";

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
    <div ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners} className="flex flex-col gap-2">
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
