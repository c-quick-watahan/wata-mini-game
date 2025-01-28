import React from "react";
import { Task } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        type: "Task",
        task,
      },
    });

  const style = {
    transition: transition || undefined,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners} className="flex gap-2">
        {task.content}
      </div>
    </div>
  );
}
