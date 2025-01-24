"use client";
import {
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
import { Game } from "../Game";
import SortableItem from "./SortableItem";

export default function GameContext({ game }: { game: Game }) {
  const { id, name, initial_array, final_array, gameImages } = game;
  const { filename, title, imgFiles } = gameImages || {};
  const [activeSelection, setActiveSelection] = useState<string | null>(null);
  const [sortables, setSortables] = useState<string[]>(imgFiles || []);
  const [titles, setTitles] = useState<string[]>(title || []);

  useEffect(() => {
    console.log(sortables);
    if (JSON.stringify(sortables) === JSON.stringify(final_array)) {
      console.log("equal");
      setModalVisibility(true);
    } else {
      return;
    }
  }, [sortables]);

  const [isModalVisible, setModalVisibility] = useState(false);

  function flipModal() {
    setModalVisibility(!isModalVisible);
  }

  function handleDragStart(event: DragStartEvent) {
    console.log("event", event?.active?.id.toString());
    setActiveSelection(event?.active?.id.toString());
    return;
  }
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id === over.id) {
      return;
    }
    const oldIndex = sortables.findIndex((item) => item === active.id);
    if (!over) {
      return;
    }
    const newIndex = sortables.findIndex((item) => item === over.id);
    const newSortables = [...sortables];
    const newTitles = [...titles];
    const tempSortableArr = arrayMove(newSortables, oldIndex, newIndex);
    const tempTileArr = arrayMove(newTitles, oldIndex, newIndex);
    setSortables(tempSortableArr);
    setTitles(tempTileArr);
  }
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (over && active.id === over.id) {
      return;
    } else if (over) {
      return;
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
            {sortables?.map((id, index) => (
              <SortableItem
                key={id}
                id={id}
                img={`/${filename}/${id}`}
                title={titles?.[index] ?? ""}
              />
            ))}
          </div>
        </SortableContext>
        {/* <DragOverlay>
          {activeSelection ? (
            <SortableItem id={activeSelection} img={activeSelection} />
          ) : null}
        </DragOverlay> */}
      </DndContext>
      <dialog id="my_modal_1" className="modal" open={isModalVisible}>
        <div className="modal-box">
          <h1 className="font-bold text-lg">Good job!</h1>
          <div className="modal-action">
            <button className="btn" onClick={flipModal}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
