"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ id }: { id: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transition: transition || undefined,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="bg-transparent border-white border-2 p-2 w-24 rounded-md text-black"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white p-2 w-24 rounded-md text-black"
    >
      {id}
    </div>
  );
}
