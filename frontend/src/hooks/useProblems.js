// src/hooks/useProblem.js

import { useContext } from "react";
import { ProblemContext } from "../context/problem.context";

export const useProblem = () => {
  const context = useContext(ProblemContext);

  if (!context) {
    throw new Error("useProblem must be used within ProblemProvider");
  }

  return context;
};