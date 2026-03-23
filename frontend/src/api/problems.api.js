import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
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

export const fetchProblems = async () => {
  try {
    const response = await api.get("/api/problems");
    return response.data;
  } catch (error) {
    throw getApiError(error, "Unable to fetch problems.");
  }
};
export const fetchProblemById = async (id) => {
  try {
    const response = await api.get(`/api/problems/${id}`);
    return response.data;
  } catch (error) {
    throw getApiError(error, `Unable to fetch problem ${id}.`);
  }
};

export const solveProblem = async (problemId, solution) => {
  try {
    const response = await api.post(`/api/problems/${problemId}/solve`, {
      solution,
    });
    return response.data;
  } catch (error) {
    throw getApiError(
      error,
      `Unable to submit solution for problem ${problemId}.`,
    );
  }
};

export const toggleProblemBookmark = async (problemId) => {
  try {
    const response = await api.post(`/api/problems/${problemId}/bookmark`);
    return response.data;
  } catch (error) {
    throw getApiError(error, `Unable to update bookmark for ${problemId}.`);
  }
};

export const fetchBookmarkedProblems = async () => {
  try {
    const response = await api.get("/api/problems/bookmarked");
    return response.data;
  } catch (error) {
    throw getApiError(error, "Unable to fetch bookmarked problems.");
  }
};

export const fetchProblemsByDifficulty = async (difficulty) => {
  try {
    const response = await api.get(`/api/problems?difficulty=${difficulty}`);
    return response.data;
  } catch (error) {
    throw getApiError(error, `Unable to fetch ${difficulty} problems.`);
  }
};
