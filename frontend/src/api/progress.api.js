import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  withCredentials: true, // Ensure cookies are sent with requests
});

api.interceptors.request.use((config) => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  const token = getCookie("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getApiError = (error, defaultMessage = "An error occurred") => {
  return error.response?.data?.message || error.message || defaultMessage;
};

// 📊 Get full user progress
export const getUserProgress = async () => {
  try {
    const response = await api.get("/api/progress");
    return response.data;
  } catch (error) {
    throw getApiError(error, "Failed to fetch progress. Please try again.");
  }
};

// 📈 Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const response = await api.get("/api/progress/stats");
    return response.data;
  } catch (error) {
    throw getApiError(error, "Failed to fetch stats. Please try again.");
  }
};

// 🔄 Update progress for a problem
export const updateProgress = async (problemId, { status, timeSpent }) => {
  try {
    const response = await api.post(`/api/progress/${problemId}`, {
      status,
      timeSpent,
    });
    return response.data;
  } catch (error) {
    throw getApiError(error, "Failed to update progress. Please try again.");
  }
};

// 📚 Get topic-wise progress
export const getTopicWiseProgress = async () => {
  try {
    const response = await api.get("/api/progress/topics");
    return response.data;
  } catch (error) {
    throw getApiError(
      error,
      "Failed to fetch topic progress. Please try again.",
    );
  }
};

// 📅 Get daily progress data
export const getDailyProgress = async () => {
  try {
    const response = await api.get("/api/progress/daily");
    return response.data;
  } catch (error) {
    throw getApiError(
      error,
      "Failed to fetch daily progress. Please try again.",
    );
  }
};
