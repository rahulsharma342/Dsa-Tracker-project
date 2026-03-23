import React from "react";
import { AuthProvider } from "./context/auth.context";
import { ProblemProvider } from "./context/problem.context";
import { ProgressProvider } from "./context/progress.context";
import { RouterProvider } from "react-router-dom";
import router from "./routes/app.routes";

const App = () => {
  return (
    <AuthProvider>
      <ProblemProvider>
        <ProgressProvider>
          <RouterProvider router={router} />
        </ProgressProvider>
      </ProblemProvider>
    </AuthProvider>
  );
};

export default App;
