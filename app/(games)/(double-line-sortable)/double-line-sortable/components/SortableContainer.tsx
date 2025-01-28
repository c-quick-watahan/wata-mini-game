"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import SortableItem from "./SortableItem";

export default function SortableContainer({
  id,
  filename,
  titles,
  sortables,
  sortableItems,
}: {
  id: number;
  filename: string;
  titles: string[];
  sortables: string[];
  sortableItems: SortableItem[];
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { type: "Sortable Row" } });
  const style = {
    transition: transition || undefined,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {" "}
      <div
        id="drop"
        className="bg-red-400 h-auto flex gap-10 p-8 rounded content-center w-fit"
      >
        {sortables?.map((id, index) => (
          <SortableItem
            key={id}
            id={id}
            img={`/${filename}/${id}`}
            title={titles?.[index] ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
