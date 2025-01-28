"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Row, Sortable } from "../types";
import RowContainer from "./RowContainer";
import SortableCard from "./SortableCard";
import { sampleGame } from "../Game";

export default function Board() {
  // Rows
  const rows = [
    { id: "top", title: "Row 1" },
    { id: "bottom", title: "Row 2" },
  ];
  const [activeRow, setActiveRow] = useState<Row | null>(null);
  // Sortables

  const [sortables, setSortables] = useState<Sortable[]>(
    sampleGame.sortableItems || []
  );
  const [activeSortable, setActiveSortable] = useState<Sortable | null>(null);
  const [isModalVisible, setModalVisibility] = useState(false);

  const [topRowAnswers, setTopRowAnswers] = useState<Sortable[]>([]);

  useEffect(() => {
    console.log("Top Row: ", topRowAnswers);
    if (topRowAnswers.length > 0) {
      for (let i = 0; i < topRowAnswers.length; i++) {
        if (
          topRowAnswers.length < sortables.length ||
          topRowAnswers[i].id !== i
        ) {
          return;
        }
      }
      console.log("got em all right!");
      setModalVisibility(true);
    }
  }, [topRowAnswers]);

  function flipModal() {
    setModalVisibility(!isModalVisible);
  }

  const onDragStart = useCallback((event: DragStartEvent) => {
    if (event.active.data.current && event.active.data.current.type === "Row") {
      setActiveRow(event.active.data.current.row);
      return;
    } else if (
      event.active.data.current &&
      event.active.data.current.type === "Sortable"
    ) {
      setActiveSortable(event.active.data.current.sortable);
      return;
    }
  }, []);

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeIndex = sortables.findIndex((t) => t.id === active.id);
    const overIndex = sortables.findIndex((t) => t.id === over.id);

    if (activeIndex !== -1 && overIndex !== -1) {
      const newSortables = arrayMove(sortables, activeIndex, overIndex);
      setSortables(newSortables);
      setTopRowAnswers(
        newSortables.filter((sortable) => sortable.rowId === "top")
      );
    }
  }
  useEffect(() => {
    const topRowIds = topRowAnswers.map((sortable) => sortable.id);
    setSortables((prevSortables) =>
      prevSortables.map((sortable) =>
        topRowIds.includes(sortable.id)
          ? sortable
          : { ...sortable, rowId: "bottom" }
      )
    );
  }, [topRowAnswers]);

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const isActiveASortable = active?.data?.current?.type === "Sortable";
    const isOverASortable = over?.data?.current?.type === "Sortable";
    const isOverARow = over?.data?.current?.type === "Row";
    const activeIndex = sortables.findIndex((t) => t.id === active.id);
    const overIndex = sortables.findIndex((t) => t.id === over.id);
    if (isActiveASortable && isOverASortable) {
      if (activeIndex !== overIndex) {
        setSortables((sortables) => {
          if (sortables[activeIndex].rowId !== sortables[overIndex].rowId) {
            sortables[activeIndex].rowId = sortables[overIndex].rowId;
          }
          return arrayMove(sortables, activeIndex, overIndex);
        });
      }
    } else if (isActiveASortable && isOverARow) {
      setSortables((sortables) => {
        const activeIndex = sortables.findIndex((t) => t.id === active.id);
        if (sortables[activeIndex].rowId !== over.id) {
          sortables[activeIndex].rowId = over.id;
          return arrayMove(sortables, activeIndex, activeIndex);
        }
        return sortables;
      });
    }
  }

  return (
    <>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div id="Board" className="h-auto gap-10 p-8 rounded">
          {rows.map((row) => (
            <div
              id="Row Container DIV"
              key={row.id}
              className="h-auto gap-2 p-8 rounded"
            >
              <RowContainer
                key={row.id}
                row={row}
                game={sampleGame}
                sortables={sortables.filter(
                  (sortable) => sortable.rowId === row.id
                )}
              />
            </div>
          ))}
        </div>
        <DragOverlay>
          {activeRow && (
            <RowContainer
              row={activeRow}
              game={sampleGame}
              sortables={sortables.filter(
                (sortable) => sortable.rowId === activeRow.id
              )}
            />
          )}
          {activeSortable && (
            <SortableCard sortable={activeSortable} game={sampleGame} />
          )}
        </DragOverlay>
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
    </>
  );
}
