import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import ItemsList from "./pages/ItemsList";
import ItemDetails from "./pages/ItemDetails";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "items", element: <ItemsList /> },
      { path: "items/:id", element: <ItemDetails /> },

      // Public
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      // Protected route
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      }
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
