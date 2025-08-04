import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useProject } from "../context/ProjectContext";
import type { Task, Project } from "../types";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { DroppableColumn } from "../components/DroppableColumn/DroppableColumn";
import { useBackendClient } from "../clients/useBackendClient";

function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const backendClient = useBackendClient();
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    async function fetchData() {
      const resProject = await backendClient.get(`/projects/${id}`);
      const resTasks = await backendClient.get(`/projects/${id}/tasks`);
      setProject(resProject.data);
      setTasks(resTasks.data);
    }
    fetchData();
  }, [id]);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const taskId = active.id;
    const newStatus = over.id; // id колонки — "To Do", "In Progress", "Done"

    const updated = tasks.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updated);

    await backendClient.put(`/tasks/${taskId}`, { status: newStatus });
  };

  const handleDelete = async (taskId: string) => {
    await backendClient.delete(`/tasks/${taskId}`);
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskToEdit) return;
    const form = e.currentTarget;
    const formData = new FormData(form);

    const updatedTask = {
      ...taskToEdit,
      name: formData.get("editName")?.toString() || "",
      description: formData.get("editDescription")?.toString() || "",
    };

    await backendClient.put(`/tasks/${taskToEdit._id}`, updatedTask);
    setTasks((prev) =>
      prev.map((task) => (task._id === taskToEdit._id ? updatedTask : task))
    );
    setTaskToEdit(null);
    form.reset();
  };

  const columns = ["To Do", "In Progress", "Done"];

  const tasksByStatus = (status: string) =>
    tasks.filter((t) => t.status === status);

  return (
    <div className="container py-4">
      <h1 className="mb-4">{project?.name}</h1>

      <button
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#createTaskModal"
      >
        Add Task
      </button>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="row">
          {columns.map((status) => (
            <div key={status} className="col-md-4">
              <h5 className="text-center">{status}</h5>
              <DroppableColumn id={status} tasks={tasksByStatus(status)} onEdit={(task) => setTaskToEdit(task)}
                onDelete={handleDelete} />
            </div>
          ))}
        </div>
      </DndContext>

      <div className="modal fade" id="createTaskModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formDataObj = new FormData(form);

                  const newTask = {
                    name: formDataObj.get("name")?.toString() || "",
                    description:
                      formDataObj.get("description")?.toString() || "",
                    status: "To Do",
                  };

                  try {
                    const res = await backendClient.post(
                      `/projects/${id}/tasks`,
                      newTask
                    );
                    setTasks((prev) => [...prev, res.data]);
                    form.reset();

                    (document.activeElement as HTMLElement)?.blur();
                  } catch (error) {
                    console.error("Task creation error:", error);
                  }
                }}
              >
                <div className="mb-3">
                  <label htmlFor="taskName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="taskName"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="taskDesc" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="taskDesc"
                    className="form-control"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Task
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

<div className="modal fade" id="editTaskModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEdit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="editName"
                    defaultValue={taskToEdit?.name || ""}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="editDescription"
                    defaultValue={taskToEdit?.description || ""}
                    className="form-control"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ProjectPage;
