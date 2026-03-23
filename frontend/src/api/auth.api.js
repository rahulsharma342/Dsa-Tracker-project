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

export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw getApiError(error, "Registration failed. Please try again.");
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw getApiError(
      error,
      "Login failed. Please check your connection and try again.",
    );
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    throw getApiError(error, "Logout failed. Please try again.");
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (error) {
    throw getApiError(error, "Unable to fetch current user.");
  }
};
