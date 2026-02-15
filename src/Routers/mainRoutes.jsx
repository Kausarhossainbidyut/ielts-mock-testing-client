import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import NotFoundPage from "../pages/auth/NotFoundPage";
import RegistrationPage from "../pages/auth/RegistrationPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";
import RootLayout from "../layouts/RootLayout";
import Home from "../Home";

// Public Pages
import TestsPage from "../pages/public/TestsPage";
import TipsPage from "../pages/public/TipsPage";
import ResourcesPage from "../pages/public/ResourcesPage";

// Test Module
import TestPage from "../pages/test-modules/TestPage";
import ListeningTest from "../pages/test-modules/ListeningTest";
import ReadingTest from "../pages/test-modules/ReadingTest";
import WritingTest from "../pages/test-modules/WritingTest";
import SpeakingTest from "../pages/test-modules/SpeakingTest";

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
import ResourceManagement from "../pages/admin/ResourceManagement";

const mainRoutes = createBrowserRouter([
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      // Public Pages
      {
        path: "/tests",
        element: <TestsPage />
      },
      {
        path: "/listening",
        element: <TestsPage filter="listening" />
      },
      {
        path: "/reading",
        element: <TestsPage filter="reading" />
      },
      {
        path: "/writing",
        element: <TestsPage filter="writing" />
      },
      {
        path: "/speaking",
        element: <TestsPage filter="speaking" />
      },
      {
        path: "/tips",
        element: <TipsPage />
      },
      {
        path: "/resources",
        element: <ResourcesPage />
      },
      // Test Taking Pages
      {
        path: "/test/:id",
        element: <PrivateRoute><TestPage /></PrivateRoute>
      },
      {
        path: "/test/listening/:id",
        element: <PrivateRoute><ListeningTest /></PrivateRoute>
      },
      {
        path: "/test/reading/:id",
        element: <PrivateRoute><ReadingTest /></PrivateRoute>
      },
      {
        path: "/test/writing/:id",
        element: <PrivateRoute><WritingTest /></PrivateRoute>
      },
      {
        path: "/test/speaking/:id",
        element: <PrivateRoute><SpeakingTest /></PrivateRoute>
      },
      {
        path: "/test/speaking/:id",
        element: <PrivateRoute><SpeakingTest /></PrivateRoute>
      },
      // User Dashboard Routes
      {
        path: "/dashboard",
        element: <PrivateRoute requireAdmin={false}><DashboardLayout /></PrivateRoute>,
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
        element: <PrivateRoute requireAdmin={true}><AdminLayout /></PrivateRoute>,
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
            element: <ResourceManagement />
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
