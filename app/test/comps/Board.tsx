"use client";
import React, { useMemo, useState, useCallback } from "react";
import { Column, Id, Task } from "./types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

const Board = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function createTask(columnId: Id) {
    const taskToAdd: Task = {
      id: generateId(),
      columnId: columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, taskToAdd]);
  }
  const onDragStart = useCallback((event: DragStartEvent) => {
    if (
      event.active.data.current &&
      event.active.data.current.type === "Column"
    ) {
      setActiveColumn(event.active.data.current.column);
      return;
    } else if (
      event.active.data.current &&
      event.active.data.current.type === "Task"
    ) {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }, []);

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) return;
    setColumns((columns) => {
      const activeColIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColIndex = columns.findIndex((col) => col.id === overColumnId);
      return arrayMove(columns, activeColIndex, overColIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const isActiveATask = active?.data?.current?.type === "Task";
    const isOverATask = over?.data?.current?.type === "Task";
    const isOverAColumn = over?.data?.current?.type === "Column";

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);
        const overIndex = tasks.findIndex((t) => t.id === over.id);
        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
        } else if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
        }
        return arrayMove(tasks, activeIndex, overIndex);
      });
    } else if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);

        tasks[activeIndex].columnId = over.id;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div
        className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
      "
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                createTask={createTask}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            ))}
          </div>
          <button onClick={createNewColumn}>Click</button>
        </div>
      </div>
      {/* </SortableContext> */}
      <DragOverlay>
        {activeColumn && (
          <ColumnContainer
            column={activeColumn}
            createTask={createTask}
            tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
          />
        )}
        {activeTask && <TaskCard task={activeTask} />}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
