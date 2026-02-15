import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// User Dashboard APIs
export const userDashboardAPI = {
  // Get user dashboard data
  getDashboard: () => api.get("/users/dashboard"),
  
  // Get test history
  getTestHistory: () => api.get("/users/tests/history"),
  
  // Get practice history
  getPracticeHistory: () => api.get("/users/practice/history"),
  
  // Get user analytics
  getAnalytics: () => api.get("/users/analytics"),
  
  // Get saved resources
  getSavedResources: () => api.get("/users/resources/saved"),
  
  // Save a resource
  saveResource: (resourceId) => api.post("/users/resources/save", { resourceId }),
  
  // Update user profile
  updateProfile: (data) => api.put("/users/profile", data),
};

// Results APIs
export const resultsAPI = {
  // Get user results
  getMyResults: () => api.get("/results/my-results"),
  
  // Get user statistics
  getStatistics: () => api.get("/results/statistics"),
  
  // Submit a result
  submitResult: (data) => api.post("/results/submit", data),
  
  // Get leaderboard
  getLeaderboard: () => api.get("/results/leaderboard"),
};

// Tests APIs
export const testsAPI = {
  // Get all tests
  getAllTests: () => api.get("/tests"),
  
  // Get popular tests
  getPopularTests: () => api.get("/tests/popular"),
  
  // Get tests by type
  getTestsByType: (type) => api.get(`/tests/type/${type}`),
  
  // Get test by ID
  getTestById: (id) => api.get(`/tests/${id}`),
};

// Admin APIs
export const adminAPI = {
  // Get admin dashboard
  getDashboard: () => api.get("/admin/dashboard"),
  
  // Get all users
  getUsers: () => api.get("/admin/users"),
  
  // Get user details
  getUserDetails: (id) => api.get(`/admin/users/${id}`),
  
  // Update user
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  
  // Delete user
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  
  // Get system analytics
  getAnalytics: () => api.get("/admin/analytics"),
  
  // Get content stats
  getContentStats: () => api.get("/admin/content-stats"),
};

export default api;
