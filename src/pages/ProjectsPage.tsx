import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useProject } from "../context/ProjectContext";
import type { Project } from "../types";
import { Modal } from "bootstrap";
import { Link } from "react-router-dom";

function ProjectsPage() {
  const { currentUser } = useUser();
  const { projects, fetchProjects, addProject, updateProject, deleteProject } =
    useProject();
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setFormData({ name: "", description: "" });
    const modalEl = document.getElementById("projectModal");
    if (modalEl) {
      const modal = new Modal(modalEl);
      modal.show();
    }
  };

  const openEditModal = (project: Project) => {
    setModalMode("edit");
    setSelectedProject(project);
    setFormData({ name: project.name, description: project.description });
    const modalEl = document.getElementById("projectModal");
    if (modalEl) {
      const modal = new Modal(modalEl);
      modal.show();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === "create") {
      await addProject(formData);
    } else if (selectedProject) {
      await updateProject(selectedProject._id, formData);
    }
    const modalEl = document.getElementById("projectModal");
    if (modalEl) {
      const modal = Modal.getInstance(modalEl);
      modal?.hide();
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-3 text-center">Hi {currentUser?.user.username}!</h1>

      <p className="text-muted">These are the projects owned by you.</p>
      <button className="btn btn-primary mb-3" onClick={openCreateModal}>
        Create New Project
      </button>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {projects.map((project) => (
          <div key={project._id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  <Link
                    to={`/projects/${project._id}`}
                    className="text-decoration-none"
                  >
                    {project.name}
                  </Link>
                </h5>
                <p className="card-text">{project.description}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => openEditModal(project)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteProject(project._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="projectModal"
        tabIndex={-1}
        aria-labelledby="projectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="projectModalLabel">
                {modalMode === "create" ? "Create Project" : "Edit Project"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="projectTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectTitle"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="projectDescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="projectDescription"
                    rows={3}
                    value={formData.description}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  {modalMode === "create" ? "Create" : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
