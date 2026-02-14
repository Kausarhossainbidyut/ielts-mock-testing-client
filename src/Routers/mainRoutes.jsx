import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import NotFoundPage from "../pages/auth/NotFoundPage";
import RegistrationPage from "../pages/auth/RegistrationPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";
import RootLayout from "../layouts/RootLayout";
import Home from "../Home";

// User Dashboard Pages
import MyTests from "../pages/user/MyTests";
import MyResults from "../pages/user/MyResults";
import Progress from "../pages/user/Progress";
import WeakAreas from "../pages/user/WeakAreas";
import SavedResources from "../pages/user/SavedResources";
import PracticeHistory from "../pages/user/PracticeHistory";

// Admin Dashboard Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import TestManagement from "../pages/admin/TestManagement";
import UserManagement from "../pages/admin/UserManagement";
import Analytics from "../pages/admin/Analytics";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      // User Dashboard Routes
      {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
          {
            index: true,
            element: <MyTests />
          },
          {
            path: "my-tests",
            element: <MyTests />
          },
          {
            path: "my-results",
            element: <MyResults />
          },
          {
            path: "progress",
            element: <Progress />
          },
          {
            path: "weak-areas",
            element: <WeakAreas />
          },
          {
            path: "saved-resources",
            element: <SavedResources />
          },
          {
            path: "history",
            element: <PracticeHistory />
          }
        ],
      },
      // Admin Dashboard Routes
      {
        path: "/admin",
        element: <PrivateRoute><AdminLayout /></PrivateRoute>,
        children: [
          {
            index: true,
            element: <AdminDashboard />
          },
          {
            path: "dashboard",
            element: <AdminDashboard />
          },
          {
            path: "tests",
            element: <TestManagement />
          },
          {
            path: "questions",
            element: <TestManagement />
          },
          {
            path: "users",
            element: <UserManagement />
          },
          {
            path: "audio",
            element: <AdminDashboard />
          },
          {
            path: "resources",
            element: <AdminDashboard />
          },
          {
            path: "analytics",
            element: <Analytics />
          },
          {
            path: "reports",
            element: <Analytics />
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
