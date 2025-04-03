import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./redux/store"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import { Projects } from "./pages/Projects"
import ProjectDetails from "./pages/ProjectDetails"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "project/:projectId",
        element: <ProjectDetails />,
      },
      {
        path: "project/edit/:projectId",
        element: <div> Testing route for editing!! </div>,
      },
      {
        path: "/",
        element: <Projects />,
      },
    ],
  },
])

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </LocalizationProvider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
