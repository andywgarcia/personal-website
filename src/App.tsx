import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./hooks/withRoot";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import projects from "./helpers/projects";
import Project from "./pages/project/Project";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <>
          <AppAppBar />
          <Outlet />
        </>
      }
    >
      <Route index element={<Home />} />
      <Route
        path="projects"
        element={<Navigate to="/#featured-projects" replace />}
      />
      <Route path="education" element={<div>Education</div>} />
      <Route path="*" element={<NotFoundPage />} />
      {projects.map((project) => (
        <Route
          path={`projects/${project.title
            .toLocaleLowerCase()
            .replace(" ", "-")}`}
          element={<Project {...project} />}
        />
      ))}
    </Route>,
  ),
);
function App() {
  return <RouterProvider router={router} />;
}

export default withRoot(App);
