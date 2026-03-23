import { createContext, useCallback, useState } from "react";
import { fetchProblems, toggleProblemBookmark } from "../api/problems.api.js";

export const ProblemContext = createContext();

export const ProblemProvider = ({ children }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProblems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProblems();
      const fetchedProblems = Array.isArray(data?.problems)
        ? data.problems
        : Array.isArray(data)
          ? data
          : [];

      setProblems((prev) => {
        const bookmarkedLookup = new Map(
          prev.map((problem) => [problem._id, Boolean(problem.isBookmarked)]),
        );

        return fetchedProblems.map((problem) => ({
          ...problem,
          isBookmarked:
            problem.isBookmarked ?? bookmarkedLookup.get(problem._id) ?? false,
        }));
      });
    } catch (error) {
      console.error("Failed to load problems:", error);
      setProblems([]);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleBookmark = useCallback(async (problemId, isBookmarked) => {
    setProblems((prev) =>
      prev.map((problem) =>
        problem._id === problemId
          ? { ...problem, isBookmarked: !isBookmarked }
          : problem,
      ),
    );

    try {
      await toggleProblemBookmark(problemId);
    } catch (error) {
      setProblems((prev) =>
        prev.map((problem) =>
          problem._id === problemId ? { ...problem, isBookmarked } : problem,
        ),
      );
      throw error;
    }
  }, []);

  const openProblem = useCallback((link) => {
    if (!link) {
      return;
    }

    window.open(link, "_blank", "noopener,noreferrer");
  }, []);

  const value = {
    problems,
    loading,
    getProblems,
    toggleBookmark,
    openProblem,
  };

  return (
    <ProblemContext.Provider value={value}>{children}</ProblemContext.Provider>
  );
};
