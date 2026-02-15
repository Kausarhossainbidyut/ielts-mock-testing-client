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

// Auth APIs
export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (userData) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout", {}),
  getCurrentUser: () => api.get("/auth/me"),
};

// User Dashboard APIs
export const userAPI = {
  getDashboard: () => api.get("/v1/users/dashboard"),
  updateProfile: (data) => api.put("/v1/users/profile", data),
  getTestHistory: () => api.get("/v1/users/tests/history"),
  getPracticeHistory: () => api.get("/v1/users/practice/history"),
  getAnalytics: () => api.get("/v1/users/analytics"),
  saveResource: (resourceId) => api.post("/v1/users/resources/save", { resourceId }),
  getSavedResources: () => api.get("/v1/users/resources/saved"),
};

// Results APIs
export const resultsAPI = {
  getMyResults: () => api.get("/v1/results/my-results"),
  getStatistics: () => api.get("/v1/results/statistics"),
  submitResult: (data) => api.post("/v1/results/submit", data),
  getLeaderboard: () => api.get("/v1/results/leaderboard"),
  getResultById: (id) => api.get(`/v1/results/${id}`),
};

// Tests APIs
export const testsAPI = {
  getAllTests: () => api.get("/v1/tests"),
  getPopularTests: () => api.get("/v1/tests/popular"),
  getTestsByType: (type) => api.get(`/v1/tests/type/${type}`),
  getTestById: (id) => api.get(`/v1/tests/${id}`),
  createTest: (data) => api.post("/v1/tests", data),
  updateTest: (id, data) => api.put(`/v1/tests/${id}`, data),
  deleteTest: (id) => api.delete(`/v1/tests/${id}`),
};

// Question APIs
export const questionsAPI = {
  getListeningQuestions: (testId) => api.get(`/v1/questions/listening?testId=${testId}`),
  getReadingQuestions: (testId) => api.get(`/v1/questions/reading?testId=${testId}`),
  getWritingQuestions: (testId) => api.get(`/v1/questions/writing?testId=${testId}`),
  getSpeakingQuestions: (testId) => api.get(`/v1/questions/speaking?testId=${testId}`),
  createQuestion: (type, data) => api.post(`/v1/questions/${type}`, data),
  updateQuestion: (type, id, data) => api.put(`/v1/questions/${type}/${id}`, data),
  deleteQuestion: (type, id) => api.delete(`/v1/questions/${type}/${id}`),
};

// Resources APIs
export const resourcesAPI = {
  getAllResources: () => api.get("/v1/resources"),
  getResourceById: (id) => api.get(`/v1/resources/${id}`),
  createResource: (data) => api.post("/v1/resources", data),
  updateResource: (id, data) => api.put(`/v1/resources/${id}`, data),
  deleteResource: (id) => api.delete(`/v1/resources/${id}`),
};

// Tips APIs
export const tipsAPI = {
  getAllTips: () => api.get("/v1/tips"),
  getTipById: (id) => api.get(`/v1/tips/${id}`),
  createTip: (data) => api.post("/v1/tips", data),
  updateTip: (id, data) => api.put(`/v1/tips/${id}`, data),
  deleteTip: (id) => api.delete(`/v1/tips/${id}`),
};

// Practice Session APIs
export const practiceAPI = {
  startSession: (data) => api.post("/v1/practice/start", data),
  updateSession: (id, data) => api.put(`/v1/practice/${id}`, data),
  endSession: (id) => api.post(`/v1/practice/${id}/end`, {}),
  getSessionById: (id) => api.get(`/v1/practice/${id}`),
};

// Admin APIs
export const adminAPI = {
  getDashboard: () => api.get("/v1/admin/dashboard"),
  getUsers: () => api.get("/v1/admin/users"),
  getUserDetails: (id) => api.get(`/v1/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/v1/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/v1/admin/users/${id}`),
  getAnalytics: () => api.get("/v1/admin/analytics"),
  getContentStats: () => api.get("/v1/admin/content-stats"),
  backupData: () => api.get("/v1/admin/backup"),
};

export default api;
