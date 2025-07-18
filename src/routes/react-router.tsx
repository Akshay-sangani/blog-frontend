import { createBrowserRouter, type RouteObject } from "react-router";
import { AppLayout } from "../components";

import { PostPage } from "../features/post/PostPage";
import { Dashboard } from "../features/dashboard/Dashboard";
import { Profile } from "../features/profile/Profile";
import { ProfileCard } from "../components/ProfileCard";
import { Login } from "../features/auth";
import { Register } from "../features/auth";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index : true,
        path  : "/",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/post/:id",
        element: <PostPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/:id",
        element: <ProfileCard />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
