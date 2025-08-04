# Project Management App Frontend

A responsive and interactive React + TypeScript application for managing projects and tasks in a Kanban-style interface. Built with Bootstrap 5.3 and integrated with a secure backend API.

## 🧱 Technologies

- React
- TypeScript
- Vite
- React Router DOM
- Context API
- Axios
- Bootstrap 5.3 (custom theming)
- dnd-kit (for drag-and-drop)

## 📂 Folder Structure

```
/src
  /assets
  /clients
    useBackendClient.ts

  /components
    /DroppableColumn
    /Layout
    /TaskCard
    /ThemeSwitcher

  /context
    ProjectContext.tsx
    ThemeContext.tsx
    UserContext.tsx

  /hooks
    useLocalStorage.ts

  /pages
    HomePage.tsx
    LoginPage.tsx
    NotFoundPage.tsx
    ProjectPage.tsx
    ProjectsPage.tsx
    RegisterPage.tsx

  /types
    index.ts

  App.tsx
  main.tsx

.env.local
```

## 📦 Installation

npm install

## 🔧 Environment Setup

Create a `.env.local` file in the root with: VITE_APP_API_URL

## 🏃 Run Locally

npm run dev

Open in browser: http://localhost:5173

## 📘 Features

### ✅ Authentication

- User registration and login
- JWT stored in memory (Context API)
- Redirect to login if user is not authenticated
- Token is automatically attached to all API requests

### 📁 Project Dashboard

- View all projects owned by the user
- Create, update, delete projects

### 📌 Project Detail Page

- Kanban board with drag-and-drop columns:
  - To Do
  - In Progress
  - Done
- Tasks can be:
  - Created
  - Edited
  - Deleted
  - Dragged between columns (status changes)
- Fully responsive layout with Bootstrap

## 🌐 Deployment

Deployed as a static site on Render:

https://dmytro-pm-app-frontend.onrender.com
