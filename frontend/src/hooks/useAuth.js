import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { loginUser, registerUser, logoutUser } from "../api/auth.api.js";

const AUTH_TOKEN_KEY = "authToken";

const setCookie = (name, value, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()};`;
};

const removeCookie = (name) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ name, email, password }) {
    setLoading(true);
    try {
      const data = await registerUser({ name, email, password });
      if (data?.token) {
        setCookie(AUTH_TOKEN_KEY, data.token);
      }
      setUser(data.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin({ email, password }) {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      if (data?.token) {
        setCookie(AUTH_TOKEN_KEY, data.token);
      }
      setUser(data.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      removeCookie(AUTH_TOKEN_KEY);
    } catch (error) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
