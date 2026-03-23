import { useContext, useEffect } from "react";
import { ProgressContext } from "../context/progress.context.jsx";

export const useProgress = () => {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }

  const {
    stats,
    progress,
    topicWise,
    dailyProgress,
    loading,
    error,
    fetchDashboardData,
    updateProblemProgress,
  } = context;

  // Fetch data on mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Calculate useful metrics
  const getTotalAttempts = () => {
    return progress.reduce((sum, p) => sum + (p.attempts || 0), 0);
  };

  const getTotalTimeSpent = () => {
    return progress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
  };

  const getAverageTimePerProblem = () => {
    if (progress.length === 0) return 0;
    return (getTotalTimeSpent() / progress.length).toFixed(2);
  };

  const getSolvedProblems = () => {
    return progress.filter((p) => p.status === "solved").length;
  };

  const getUnsolvedProblems = () => {
    return progress.filter((p) => p.status === "unsolved").length;
  };

  const getTopicStats = () => {
    const stats = {};
    progress.forEach((p) => {
      const topic = p.topic || "Unknown";
      if (!stats[topic]) {
        stats[topic] = { solved: 0, unsolved: 0, total: 0 };
      }
      stats[topic].total++;
      if (p.status === "solved") {
        stats[topic].solved++;
      } else {
        stats[topic].unsolved++;
      }
    });
    return stats;
  };

  const getDifficultyStats = () => {
    const stats = { Easy: 0, Medium: 0, Hard: 0 };
    progress.forEach((p) => {
      if (p.difficulty in stats) {
        stats[p.difficulty]++;
      }
    });
    return stats;
  };

  return {
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

    // Computed metrics
    totalAttempts: getTotalAttempts(),
    totalTimeSpent: getTotalTimeSpent(),
    averageTimePerProblem: getAverageTimePerProblem(),
    solvedProblems: getSolvedProblems(),
    unsolvedProblems: getUnsolvedProblems(),
    topicStats: getTopicStats(),
    difficultyStats: getDifficultyStats(),
  };
};
