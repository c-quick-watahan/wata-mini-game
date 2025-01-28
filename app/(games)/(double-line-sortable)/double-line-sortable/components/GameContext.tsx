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
import { Game, Item } from "../Game";
import SortableItem from "./SortableItem";
import SortableContainer from "./SortableContainer";

export default function GameContext({ game }: { game: Game }) {
  const { id, name, initial_array, final_array, sortableItems } = game;
  const [activeSelection, setActiveSelection] = useState<string | null>(null);
  const [sortables, setSortables] = useState<Item[]>(sortableItems || []);

  const [answerSortables, setAnswerSortables] = useState<string[]>(["1", "2"]);
  const [answerTitles, setAnswerTitles] = useState<string[]>([]);

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
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    console.log(event);

    if (over && over.data.current)
      if (over && active.id === over.id) {
        return;
      } else if (over) {
        return;
      }
  }
  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    //   if (over && active.id === over.id) {
    //     return;
    //   }
    //   const oldIndex = sortables.findIndex((item) => item === active.id);
    //   if (!over) {
    //     return;
    //   }
    //   const newIndex = sortables.findIndex((item) => item === over.id);
    //   const newSortables = [...sortables];
    //   const newTitles = [...titles];
    //   const tempSortableArr = arrayMove(newSortables, oldIndex, newIndex);
    //   const tempTileArr = arrayMove(newTitles, oldIndex, newIndex);
    //   setSortables(tempSortableArr);
    //   setTitles(tempTileArr);
    // }

    if (over) {
      const activeContainer = sortables.includes(active.id.toString())
        ? sortables
        : answerSortables;
      const overContainer = sortables.includes(over.id.toString())
        ? sortables
        : answerSortables;

      if (activeContainer === overContainer) {
        const oldIndex = activeContainer.indexOf(active.id.toString());
        const newIndex = overContainer.indexOf(over.id.toString());
        const newTitles = [...titles];
        const newItems = arrayMove(activeContainer, oldIndex, newIndex);
        const tempTileArr = arrayMove(newTitles, oldIndex, newIndex);
        if (activeContainer === sortables) {
          setSortables(newItems);
          setTitles(tempTileArr);
        } else {
          setAnswerSortables(newItems);
        }
      } else {
        const activeIndex = activeContainer.indexOf(active.id.toString());
        const overIndex = overContainer.indexOf(over.id.toString());

        const newActiveContainer = [...activeContainer];
        const newOverContainer = [...overContainer];

        newActiveContainer.splice(activeIndex, 1);
        newOverContainer.splice(overIndex, 0, active.id.toString());

        if (activeContainer === sortables) {
          setSortables(newActiveContainer);
          setAnswerSortables(newOverContainer);
        } else {
          setSortables(newOverContainer);
          setAnswerSortables(newActiveContainer);
        }
      }
      console.log("New answers:", answerSortables);
      console.log("New items:", sortables);
    } else {
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
          items={[...answerSortables, ...sortables]}
          strategy={horizontalListSortingStrategy}
          id={"selectionRow"}
        >
          <SortableContainer
            id={1}
            filename={filename ?? ""}
            titles={titles}
            sortables={answerSortables}
          />

          <SortableContainer
            id={2}
            filename={filename ?? ""}
            titles={titles}
            sortables={sortables}
          />
        </SortableContext>
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
