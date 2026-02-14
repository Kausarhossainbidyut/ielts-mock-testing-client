import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import LoginPage from "../pages/auth/LoginPage";
import NotFoundPage from "../pages/auth/NotFoundPage";
import RegistrationPage from "../pages/auth/RegistrationPage";
import Home from "../Home";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
          {
            index: true,
            element: <div className="p-4">Dashboard Content Coming Soon</div>,
          }
        ],
      },
      {
        path: "login",
        element: <LoginPage></LoginPage>
      },
      {
        path: "registration",
        element: <RegistrationPage></RegistrationPage>
      },
      {
        path: "*",
        element: <NotFoundPage></NotFoundPage>
      }
    ],
  },
]);

export default mainRoutes;