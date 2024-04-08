import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./user/pages/HomePage";
import DashBoard from "./admin/pages/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  { path: "/admin", element: <DashBoard /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
