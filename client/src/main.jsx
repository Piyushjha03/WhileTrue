import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import CourseInfo from "./pages/CourseInfo";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

import { useUser } from "@clerk/clerk-react";
import { createContext, useContext } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "course/:id",
        element: <CourseInfo />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
]);

// clerk auth
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function ClerkUser() {
  const { isSignedIn, user } = useUser();

  const userContext = createContext({
    userId: user.id,
  });

  if (isSignedIn) {
    return user.id;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      publishableKey={PUBLISHABLE_KEY}
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
