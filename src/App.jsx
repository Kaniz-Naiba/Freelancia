import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import AddTask from "./pages/AddTask";
import BrowseTasks from "./pages/BrowseTasks";
import MyPostedTasks from "./pages/MyPostedTasks";
import TaskDetails from "./pages/TaskDetails"; 
import PrivateRoute from "./routes/PrivateRoute";
import UpdateTask from "./pages/UpdateTask";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Overview from "./pages/Dashboard/Overview";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Register /> },
      {
        path: "/add-task",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/browse-tasks",
        element: (
         
            <BrowseTasks />
         
        ),
      },
      {
        path: "/my-posted-tasks",
        element: (
          <PrivateRoute>
            <MyPostedTasks />
          </PrivateRoute>
        ),
      },
      {
  path: "/update-task/:id",
  element: (
    <PrivateRoute>
      <UpdateTask />
    </PrivateRoute>
  ),
},

      {
        path: "/task-details/:id",
        element: (
          
            <TaskDetails />
          
        ),
      },
    ],
  },
  {
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    { index: true, element: <Overview /> }, // default route
    { path: "browse-tasks", element: < BrowseTasks/> },
    { path: "add-task", element: <AddTask /> },
    { path: "my-posted-tasks", element: <MyPostedTasks /> },
  ],
},
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
