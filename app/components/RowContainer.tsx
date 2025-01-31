"use client";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SortableCard from "./SortableCard";
import { Row, Sortable } from "../interfaces/types";
import { Game } from "../interfaces/Game";

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
    width: "100%",
  };

  return (
    <div
      id="Row Container"
      className="inline-block flex justify-center min-h-52 bg-[#0066A5] rounded-md"
      ref={setNodeRef}
      style={style}
      suppressHydrationWarning={true}
      aria-describedby=""
    >
      <div
        id="Row Container Context"
        className="flex items-center gap-[2rem]"
        {...attributes}
        {...listeners}
      >
        <SortableContext items={sortables}>
          {sortables.map((sortable) => (
            <div
              id="Sortable Card"
              className="h-auto rounded-md text-black inline-block w-fit"
              key={sortable.id}
            >
              <SortableCard key={sortable.id} sortable={sortable} game={game} />
            </div>
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default RowContainer;
