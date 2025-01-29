"use client";
import React, { useState, useCallback, useEffect, useId } from "react";
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
  const rows = [
    { id: "top", title: "Row 1" },
    { id: "bottom", title: "Row 2" },
  ];
  const [activeRow, setActiveRow] = useState<Row | null>(null);
  const [sortables, setSortables] = useState<Sortable[]>(
    sampleGame.sortableItems || []
  );
  const [activeSortable, setActiveSortable] = useState<Sortable | null>(null);
  const [isModalVisible, setModalVisibility] = useState(false);

  const [topRowAnswers, setTopRowAnswers] = useState<Sortable[]>([]);

  useEffect(() => {
    if (topRowAnswers.length > 0) {
      for (let i = 0; i < topRowAnswers.length; i++) {
        if (
          topRowAnswers.length < sortables.length ||
          topRowAnswers[i].id !== i
        ) {
          return;
        }
      }
      setModalVisibility(true);
    }
  }, [topRowAnswers]);
  useEffect(() => {
    const topRowIds = topRowAnswers.map((sortable) => sortable.id);
    setTimeout(() =>
      setSortables((prevSortables) =>
        prevSortables.map((sortable) =>
          topRowIds.includes(sortable.id)
            ? sortable
            : { ...sortable, rowId: "bottom" }
        )
      )
    );
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
        setTimeout(
          () =>
            setSortables((currSortables) => {
              const prev = [...currSortables];
              if (prev[activeIndex].rowId !== prev[overIndex].rowId) {
                prev[activeIndex].rowId = prev[overIndex].rowId;
              }
              return arrayMove(prev, activeIndex, overIndex);
            }),
          0
        );
      }
    } else if (isActiveASortable && isOverARow) {
      setTimeout(() => {
        setSortables((currSortables) => {
          const prev = [...currSortables];
          const activeIndex = prev.findIndex((t) => t.id === active.id);
          if (prev[activeIndex].rowId !== over.id) {
            prev[activeIndex].rowId = over.id;
            return arrayMove(prev, activeIndex, activeIndex);
          }
          return prev;
        });
      }, 0);
    } else return;
  }

  const id = useId();

  return (
    <>
      <DndContext
        id={id}
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
