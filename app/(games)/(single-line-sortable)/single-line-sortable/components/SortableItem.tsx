"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

export default function SortableItem({
  id,
  img,
  title,
}: {
  id: string;
  img: string;
  title: string;
}) {
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
  // if (isDragging) {
  //   console.log("dragging");
  //   return (
  //     <div
  //       ref={setNodeRef}
  //       {...attributes}
  //       {...listeners}
  //       style={style}
  //       className="bg-transparent border-white border-2 p-2 w-24 rounded-md text-black"
  //     ></div>
  //   );
  // }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      // className="bg-white p-2 w-auto h-auto rounded-md text-black"
    >
      <div className="min-h-full w-auto bg-white text-black text-center">
        {title}
        <Image src={img} width={227} height={80} alt="sushi" />
      </div>
    </div>
  );
}
