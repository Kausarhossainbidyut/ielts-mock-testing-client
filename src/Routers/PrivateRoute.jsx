import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider.jsx";

/**
 * Single PrivateRoute component that handles role-based access
 * - Checks if user is authenticated
 * - Automatically allows/denies access based on user role
 * - Backend roles: "admin" / "user"
 * 
 * Usage:
 * - <PrivateRoute>...</PrivateRoute> - requires login only
 * - <PrivateRoute requireAdmin>true</PrivateRoute> - admin only
 * - <PrivateRoute requireAdmin={false}>...</PrivateRoute> - user only (non-admin)
 */
const PrivateRoute = ({ children, requireAdmin }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If requireAdmin is true, only allow admin users
  if (requireAdmin === true) {
    if (user.role !== "admin") {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  }

  // If requireAdmin is explicitly false, deny admin users (user-only routes)
  if (requireAdmin === false) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return children;
  }

  // If requireAdmin is not specified, allow all authenticated users
  return children;
};

export default PrivateRoute;
