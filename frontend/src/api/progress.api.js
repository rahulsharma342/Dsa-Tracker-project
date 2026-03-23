import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const getApiError = (error, fallbackMessage) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data || { message: fallbackMessage };
  }
  return { message: fallbackMessage };
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
      "Failed to fetch topic progress. Please try again."
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
      "Failed to fetch daily progress. Please try again."
    );
  }
};
