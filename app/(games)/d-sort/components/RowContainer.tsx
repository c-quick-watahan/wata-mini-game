"use client";
import React, { useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SortableCard from "./SortableCard";
import { Id, Row, Sortable } from "../types";
import { Game } from "../Game";

interface Props {
  row: Row;
  game: Game;
  sortables: Sortable[];
}

const RowContainer = (props: Props) => {
  const { row, sortables, game } = props;
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: row.id,
      data: {
        type: "Row",
        row,
      },
      disabled: true,
    });

  const style = {
    transition: transition || undefined,
    transform: CSS.Transform.toString(transform),
  };

  const rowIds = useMemo(() => {
    return sortables.map((sortable) => sortable.id);
  }, [sortables]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
    bg-columnBackgrounColor
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    // flex-col
    "
    >
      <div
        className="
      bg-mainBackgroundColor
      textarea-md
      cursor-grab
      rounded-b-none
      p-3
      font-bold
      border-columnBackgroundColor
      border-4
      "
      >
        <div {...attributes} {...listeners}>
          <SortableContext items={sortables}>
            {row.title}
            {sortables.map((sortable) => (
              <div key={sortable.id} className="flex gap-2">
                <SortableCard
                  key={sortable.id}
                  sortable={sortable}
                  game={game}
                />
              </div>
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

export default RowContainer;
