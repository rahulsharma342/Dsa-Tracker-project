import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import { loginUser, registerUser, logoutUser } from "../api/auth.api.js";

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
    } catch (error) {
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
