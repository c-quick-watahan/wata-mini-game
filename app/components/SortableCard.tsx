"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { Sortable } from "../interfaces/types";
import { Game } from "../interfaces/Game";

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
        className="min-h-full w-auto text-black text-center"
        {...attributes}
        {...listeners}
        suppressHydrationWarning={true}
        aria-describedby=""
      >
        <div
          className="rounded-md"
          style={{
            position: "relative",
            display: "inline-block",
            border: ".25rem solid #0066A5",
            background: "#0066A5",
            width: "200px", // Set a reasonable width for the container
            height: "auto", // Let the height adjust based on the image's aspect ratio
          }}
        >
          <Image
            src={`/${game.filename}/${sortable.content}`}
            alt={`${sortable.title}`}
            layout="responsive" // Make the image responsive
            width={200} // Set the intrinsic width of the image (for aspect ratio)
            height={150} // Set the intrinsic height of the image (for aspect ratio)
            objectFit="cover" // Ensure the image fills the container
          />
          <div className="text-white text-center">{sortable.title}</div>
        </div>
      </div>
    </div>
  );
}
