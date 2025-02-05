"use client";
import React, { useState, useCallback, useEffect, useId } from "react";

// Third-party components
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"; // https://dndkit.com/
import { arrayMove } from "@dnd-kit/sortable";

// Application components
import RowContainer from "./RowContainer";
import SortableCard from "./SortableCard";
import WataPiModal from "../ui/WataPiModal";
import { fireConfetti } from "./lib/fire";
import { Game } from "../interfaces/Game";
import { Row, Sortable } from "../interfaces/types";

export default function Board({ game }: { game: Game }) {
  const rows = [
    { id: "top", title: "Row 1" },
    { id: "bottom", title: "Row 2" },
  ];
  const [activeRow, setActiveRow] = useState<Row | null>(null);
  const [sortables, setSortables] = useState<Sortable[]>(
    game.sortableItems || []
  );
  const [activeSortable, setActiveSortable] = useState<Sortable | null>(null);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [topRowAnswers, setTopRowAnswers] = useState<Sortable[]>([]);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));
  const id = useId();

  useEffect(() => {
    const randomizedSortables = [...sortables].sort(() => Math.random() - 0.5);
    setSortables(randomizedSortables);
  }, []);

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
      setTimeout(() => {
        fireConfetti();
        setModalVisibility(true);
      }, 500);
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

  function getCoupon() {
    alert("Coupon code: 10% off your next purchase!");
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

  return (
    <>
      <DndContext
        id={id}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        autoScroll={{ enabled: true }}
        sensors={sensors}
        // collisionDetection={pointerWithin}
      >
        <div id="Board" className="h-auto rounded min-w-full">
          {rows.map((row) => (
            <div
              id="Row Container DIV"
              key={row.id}
              className="h-auto gap-2 p-8 rounded"
            >
              <RowContainer
                key={row.id}
                row={row}
                game={game}
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
              game={game}
              sortables={sortables.filter(
                (sortable) => sortable.rowId === activeRow.id
              )}
            />
          )}
          {activeSortable && (
            <SortableCard sortable={activeSortable} game={game} />
          )}
        </DragOverlay>
      </DndContext>
      {isModalVisible && (
        <WataPiModal
          flipModal={flipModal}
          getCoupon={getCoupon}
          filename={game.filename}
        />
      )}
    </>
  );
}
