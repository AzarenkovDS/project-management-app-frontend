import { useDroppable } from "@dnd-kit/core";
import type { Task } from "../../types";
import TaskCard from "../TaskCard/TaskCard";

type Props = {
  id: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

export function DroppableColumn({ id, tasks, onEdit, onDelete }: Props) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="bg-white rounded p-2 min-vh-50">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
