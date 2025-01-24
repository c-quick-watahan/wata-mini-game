"use client";
import {
  closestCenter,
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import SortableItem from "./SortableItem";
import { Game } from "../interfaces/Game";

export default function GameContext({ game }: { game: Game }) {
  // id: "1",
  // name: "Sushi Game",
  // image: "puzzle.png",
  // initial_array: ["piece1", "piece2", "piece3"],
  // final_array: ["piece1", "piece2", "piece3"],
  // gameImages: {
  //   id: "string",
  //   filename: "sushi",
  //   title: ["ウロコを書く", "3枚におろす", "皮を引く", "スライス"],
  //   imgFiles: ["sushi_1.png", "sushi_2.png", "sushi_3.png", "sushi_4.png"],
  const { id, name, initial_array, final_array, gameImages } = game;

  const { filename, title, imgFiles } = gameImages || {};

  // const sortables = imgFiles || [];
  const [activeSelection, setActiveSelection] = useState<string | null>(null);
  // const [sortables, setSortables] = useState<string[]>(imgFiles || []);
  const [sortables, setSortables] = useState<string[]>(() => {
    // Thanks Copilot :)
    const shuffled = (imgFiles ?? []).slice();
    do {
      shuffled.sort(() => Math.random() - 0.5);
    } while (shuffled.every((item, index) => item === (imgFiles ?? [])[index]));
    return shuffled;
  });

  function handleDragStart(event: DragStartEvent) {
    console.log("event", event?.active?.id.toString());
    setActiveSelection(event?.active?.id.toString());
    return;
  }
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id === over.id) {
      return;
    }
    setSortables((items) => {
      const oldIndex = items.findIndex((item) => item === active.id);
      if (!over) {
        return items;
      }
      const newIndex = items.findIndex((item) => item === over.id);
      const newItems = [...items];
      const arr = arrayMove(newItems, oldIndex, newIndex);
      return arr;
    });
  };
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (over && active.id === over.id) {
      return;
    } else if (over) {
      console.log("OVER", over.id);
    }
  }
  return (
    <div>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <SortableContext
          items={sortables}
          strategy={horizontalListSortingStrategy}
        >
          <div
            id="drop"
            className="bg-red-400 h-auto flex gap-10 p-8 rounded content-center w-fit"
          >
            {sortables?.map((id) => (
              <SortableItem key={id} id={id} img={`/${filename}/${id}`} />
            ))}
          </div>
        </SortableContext>
        {/* <DragOverlay>
          {activeSelection ? (
            <SortableItem id={activeSelection} img={activeSelection} />
          ) : null}
        </DragOverlay> */}
      </DndContext>
    </div>
  );
}
