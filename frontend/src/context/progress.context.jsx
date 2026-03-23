import { createContext, useState, useCallback } from "react";
import {
  getUserProgress,
  getDashboardStats,
  updateProgress,
  getTopicWiseProgress,
  getDailyProgress,
} from "../api/progress.api.js";

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [stats, setStats] = useState(null);
  const [progress, setProgress] = useState([]);
  const [topicWise, setTopicWise] = useState([]);
  const [dailyProgress, setDailyProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 📊 Fetch all dashboard data
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, progressData, topicsData, dailyData] = await Promise.all(
        [
          getDashboardStats(),
          getUserProgress(),
          getTopicWiseProgress(),
          getDailyProgress(),
        ]
      );

      setStats(statsData.stats);
      setProgress(progressData.progress || []);
      setTopicWise(topicsData.topics || []);
      setDailyProgress(dailyData.daily || []);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔄 Update problem progress
  const updateProblemProgress = useCallback(
    async (problemId, progressData) => {
      try {
        const result = await updateProgress(problemId, progressData);
        // Refresh dashboard data after update
        await fetchDashboardData();
        return result;
      } catch (err) {
        setError(err.message || "Failed to update progress");
        throw err;
      }
    },
    [fetchDashboardData]
  );

  const value = {
    // Data
    stats,
    progress,
    topicWise,
    dailyProgress,
    loading,
    error,
    // Methods
    fetchDashboardData,
    updateProblemProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
