import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../../types";

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

function TaskCard({ task, onEdit, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card mb-2 shadow-sm bg-body border-0"
    >
      <div
        className="card-body text-body"
        {...listeners}
        {...attributes}
        style={{ cursor: "grab" }}
      >
        <h6 className="card-title mb-1">{task.name}</h6>
        <p className="card-text small text-muted">{task.description}</p>
      </div>

      <div className="card-footer bg-body-tertiary border-top py-2">
        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#editTaskModal"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
