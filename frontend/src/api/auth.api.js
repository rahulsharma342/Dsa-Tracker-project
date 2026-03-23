import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

const getApiError = (error, fallbackMessage) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data || { message: fallbackMessage };
  }

  return { message: fallbackMessage };
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
  console.log(error); // 👈 ADD THIS
  throw getApiError(
    error,
    "Login failed. Please check your connection and try again."
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
