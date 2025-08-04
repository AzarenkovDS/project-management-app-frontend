import { createContext, useMemo, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import type { Project, ProjectContextType, ProjectFormData } from "../types";
import { useBackendClient } from "../clients/useBackendClient";

const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  fetchProjects: () => console.warn("no provider"),
  addProject: () => console.warn("no provider"),
  updateProject: () => console.warn("no provider"),
  deleteProject: () => console.warn("no provider"),
});

function ProjectProvider({ children }: { children: ReactNode }) {
  const backendClient = useBackendClient();
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const res = await backendClient.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  const addProject = async (formData: ProjectFormData) => {
    try {
      const res = await backendClient.post("/projects", formData);
      setProjects((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add project", err);
    }
  };

  const updateProject = async (id: string, updatedFields: Partial<Project>) => {
    try {
      const res = await backendClient.put(`/projects/${id}`, updatedFields);
      setProjects((prev) => prev.map((p) => (p._id === id ? res.data.project : p)));
    } catch (err) {
      console.error("Failed to update project", err);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await backendClient.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete project", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const value = useMemo(
    () => ({
      projects,
      fetchProjects,
      addProject,
      updateProject,
      deleteProject,
    }),
    [projects]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export const useProject = () => {
  const context = useContext(ProjectContext);

  return context;
};

export default ProjectProvider;
