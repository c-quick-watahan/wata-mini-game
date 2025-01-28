"use client";
import React, { useState, useCallback } from "react";
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
  const [rows, setRows] = useState<Row[]>([
    { id: "top", title: "Row 1" },
    { id: "bottom", title: "Row 2" },
  ]);
  const [activeRow, setActiveRow] = useState<Row | null>(null);
  // Sortables

  const [sortables, setSortables] = useState<Sortable[]>(
    sampleGame.sortableItems || []
  );
  const [activeSortable, setActiveSortable] = useState<Sortable | null>(null);

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
    setActiveRow(null);
    setActiveSortable(null);
    const { active, over } = event;
    if (!over) return;

    const activeRowId = active.id;
    const overRowId = over.id;
    if (activeRowId === overRowId) return;
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const isActiveASortable = active?.data?.current?.type === "Sortable";
    const isOverASortable = over?.data?.current?.type === "Sortable";
    const isOverARow = over?.data?.current?.type === "Row";

    if (isActiveASortable && isOverASortable) {
      setSortables((sortables) => {
        const activeIndex = sortables.findIndex((t) => t.id === active.id);
        const overIndex = sortables.findIndex((t) => t.id === over.id);
        if (sortables[activeIndex].rowId !== sortables[overIndex].rowId) {
          sortables[activeIndex].rowId = sortables[overIndex].rowId;
        }
        return arrayMove(sortables, activeIndex, overIndex);
      });
    } else if (isActiveASortable && isOverARow) {
      setSortables((sortables) => {
        const activeIndex = sortables.findIndex((t) => t.id === active.id);

        sortables[activeIndex].rowId = over.id;

        return arrayMove(sortables, activeIndex, activeIndex);
      });
    }
  }

  return (
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
            {/* min-width: -moz-available;
  min-height: -moz-available; */}
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
  );
}
