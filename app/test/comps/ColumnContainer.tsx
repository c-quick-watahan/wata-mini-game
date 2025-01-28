"use client";
import React, { useMemo, useState } from "react";
import { Column, Id, Task } from "./types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { atRule } from "postcss";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  tasks: Task[];
  createTask: (columnId: Id) => void;
}

const Board = (props: Props) => {
  const { column, createTask, tasks } = props;
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: column.id,
      data: {
        type: "Column",
        column,
      },
      disabled: true,
    });

  const style = {
    transition: transition || undefined,
    transform: CSS.Transform.toString(transform),
  };

  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

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
    flex-col
    "
    >
      <div
        className="
      bg-mainBackgroundColor
      textarea-md
      h-[60px]
      cursor-grab
      rounded-b-none
      p-3
      font-bold
      border-columnBackgroundColor
      border-4
      "
      >
        <div {...attributes} {...listeners}>
          <SortableContext items={tasks}>
            {column.title}
            {tasks.map((task) => (
              <div className="flex gap-2">
                <TaskCard key={task.id} task={task} />
              </div>
            ))}
          </SortableContext>
        </div>
      </div>
      <button
        onClick={() => createTask(column.id)}
        className="flex gap-w items-center"
      >
        Add task
      </button>
    </div>
  );
};

export default Board;
