import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "mdb-ui-kit/css/mdb.min.css";

import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Loader from "./components/Loader";
import PostList from "./components/CoursesList";
import SignUpPage from "./authentication/SignUp";
import LoginPage from "./authentication/LoginPage";
import "./index.css";

const Add = React.lazy(() => import("./pages/AddCourse"));
const Edit = React.lazy(() => import("./pages/EditCourse"));
const Details = React.lazy(() => import("./pages/Details"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <PostList /> },
      {
        path: "courses/add",
        element: (
          <Suspense fallback={<Loader />}>
            <Add />
          </Suspense>
        ),
      },
      {
        path: "course/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <Details />
          </Suspense>
        ),
      },
      {
        path: "course/:id/edit",
        element: (
          <Suspense fallback={<Loader />}>
            <Edit />
          </Suspense>
        ),
      },
      { path: "signup", element: <SignUpPage />, replace: true },
      { path: "login", element: <LoginPage />, replace: true },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
