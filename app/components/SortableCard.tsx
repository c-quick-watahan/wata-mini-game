"use client";
import React, { use, useEffect } from "react";
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
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: sortable.id,
    data: {
      type: "Sortable",
      sortable,
    },
  });

  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${game.filename}%2F${sortable.content}?alt=media`;
  const style = {
    transition: transition || undefined,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[200px] h-[150px] rounded-md border-red-600 border-dotted border-4"
      ></div>
    );
  }
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
          className="rounded-md touch-none"
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
            src={imageUrl}
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
