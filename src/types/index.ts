// Theme
export type themeOptions = "light" | "dark";

export interface ThemeContextType {
  theme: themeOptions;
  toggleTheme: () => void;
}

// User
export type CurrentUser = {
  token: String;
  user: {
    _id: String;
    username: String;
    email: String;
  };
};

export interface UserContextType {
  currentUser: null | CurrentUser;
  register: (formData: RegisterFormData) => void;
  login: (formData: LoginFormData) => void;
  logout: () => void;
}

// Validation Error
export type ValidationError = { [key: string]: { message: string } };

// Register Form
export type RegisterFormData = {
  username: String;
  email: String;
  password: String;
};

// Login Form
export type LoginFormData = {
  email: String;
  password: String;
};

// Projects
export interface Project {
  _id: string;
  name: string;
  description: string;
  user: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
}

export interface ProjectContextType {
  projects: Project[];
  fetchProjects: () => void;
  addProject: (fromData: ProjectFormData) => void;
  updateProject: (id: string, updatedFields: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

// Tasks
export type Task = {
  _id: string;
  name: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  project: string;
};
